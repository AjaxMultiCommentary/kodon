Mix.install([
  {:jason, "~> 1.3"},
  {:req, "~> 0.4.0"},
  {:toml, "~> 0.7"}
])

Application.put_env(:kodon, GitHub.API,
  base_url:
    System.get_env(
      "GITHUB_API_URL",
      "https://api.github.com/repos/ajaxmulticommentary/commentaries_data"
    ),
  token: System.get_env("GITHUB_API_TOKEN")
)

Application.put_env(:kodon, Zotero.API,
  base_url: System.get_env("ZOTERO_API_URL"),
  token: System.get_env("ZOTERO_API_TOKEN")
)

defmodule GitHub.API do
  def get_commentaries_data! do
    base_req() |> Req.get!(url: "/contents")
  end

  def get_commentary_data!(tess_retrained_url) do
    commentary_data =
      Req.get!(tess_retrained_url)

    commentary_data.body |> Jason.decode!()
  end

  def get_image!(ajmc_id, image_id) do
    resp = base_req() |> Req.get!(url: "/contents/#{ajmc_id}/images/png/#{image_id}.png")

    resp.body["content"]
  end

  def get_pytorch_file!(ajmc_id) do
    resp = base_req() |> Req.get!(url: "/contents/#{ajmc_id}/canonical")
    files = resp.body

    Enum.find(files, fn file ->
      String.ends_with?(file["name"], "_pytorch.json")
    end)
  end

  def get_tess_retrained_file!(ajmc_id) do
    resp = base_req() |> Req.get!(url: "/contents/#{ajmc_id}/canonical")
    files = resp.body

    Enum.find(files, fn file ->
      String.ends_with?(file["name"], "_tess_retrained.json")
    end)
  end

  defp base_req do
    github_config = Application.get_env(:kodon, GitHub.API)

    Req.new(
      base_url: github_config[:base_url],
      auth: {:bearer, github_config[:token]},
      headers: [{"accept", "application/vnd.github+json"}, {"x-github-api-version", "2022-11-28"}]
    )
  end
end

defmodule Zotero.API do
  @doc """
  Example response body:
  ```
  %{
    "data" => %{
      "ISBN" => "",
      "abstractNote" => "",
      "accessDate" => "",
      "archive" => "",
      "archiveLocation" => "",
      "callNumber" => "",
      "collections" => ["NTFEUW62"],
      "creators" => [
        %{
          "creatorType" => "author",
          "firstName" => "Friedrich Wilhelm",
          "lastName" => "Schneidewin"
        }
      ],
      "date" => "1853",
      "dateAdded" => "2021-01-04T13:38:35Z",
      "dateModified" => "2023-12-13T14:10:02Z",
      "edition" => "",
      "extra" => "Citation Key: schneidewin_sophokles_1853",
      "itemType" => "book",
      "key" => "Z3E52E63",
      "language" => "ger, grc",
      "libraryCatalog" => "",
      "numPages" => "",
      "numberOfVolumes" => "",
      "place" => "Leipzig",
      "publisher" => "Weidmann",
      "relations" => %{},
      "rights" => "",
      "series" => "",
      "seriesNumber" => "",
      "shortTitle" => "",
      "tags" => [],
      "title" => "Sophokles",
      "url" => "https://archive.org/details/sophokle1v3soph",
      "version" => 2113,
      "volume" => "1"
    },
    "key" => "Z3E52E63",
    "library" => %{
      "id" => 2605700,
      "links" => %{
        "alternate" => %{
          "href" => "https://www.zotero.org/groups/2605700",
          "type" => "text/html"
        }
      },
      "name" => "AjaxMultiCommentary",
      "type" => "group"
    },
    "links" => %{
      "alternate" => %{
        "href" => "https://www.zotero.org/groups/2605700/items/Z3E52E63",
        "type" => "text/html"
      },
      "self" => %{
        "href" => "https://api.zotero.org/groups/2605700/items/Z3E52E63",
        "type" => "application/json"
      }
    },
    "meta" => %{
      "createdByUser" => %{
        "id" => 17136,
        "links" => %{
          "alternate" => %{
            "href" => "https://www.zotero.org/matteo.romanello",
            "type" => "text/html"
          }
        },
        "name" => "Matteo Romanello",
        "username" => "matteo.romanello"
      },
      "creatorSummary" => "Schneidewin",
      "numChildren" => 0,
      "parsedDate" => "1853"
    },
    "version" => 2113
  }
  ```
  """
  def item(item_key) do
    resp =
      base_req()
      |> Req.get!(url: "/items/#{item_key}")

    body = resp.body
    data = body |> Map.get("data")

    extra =
      data
      |> Map.get("extra")
      |> String.split("\n")
      |> Enum.map(&String.split(&1, ": "))
      |> Map.new(fn [k, v] -> {k, v} end)

    Map.put(data, "extra", extra)
  end

  defp base_req do
    zotero_config = Application.get_env(:kodon, Zotero.API)

    Req.new(
      base_url: zotero_config[:base_url],
      auth: {:bearer, zotero_config[:token]},
      json: true
    )
  end
end

defmodule CanonicalCommentaries do
  @entity_labels ~w(pers.author work.primlit scope)

  @entity_wikidata_to_cts_mapping File.read!("static/json/wikidata_hucit_mappings.json")
                                  |> Jason.decode!()

  @outpath_prefix "commentaries"

  @citable_lines "out/editions/tlg0011.tlg003.ajmc-lj.jsonl"
                 |> File.read!()
                 |> String.split("\n")
                 |> Enum.filter(&(String.trim(&1) != ""))
                 |> Enum.map(&Jason.decode!/1)
                 |> Enum.filter(&(&1["type"] == "text_container"))

  require Logger

  defmodule Templates do
    require EEx

    EEx.function_from_file(
      :def,
      :commentary_header,
      "support/templates/commentary_header.md.eex",
      [
        :assigns
      ]
    )

    EEx.function_from_file(
      :def,
      :lemma_comment,
      "support/templates/lemma_comment.md.eex",
      [
        :assigns
      ]
    )

    EEx.function_from_file(
      :def,
      :lemmaless_comment,
      "support/templates/lemmaless_comment.md.eex",
      [
        :assigns
      ]
    )
  end

  defmodule WordRange do
    @moduledoc """
    This module provides a shared interface for working with the `words` and other text container arrays in AjMC's
    canonical JSON representation.
    """

    @doc """
    Returns the given `range` of `words`. Also accepts a tuple of
    `[first, last]` instead of a range.

    ## Examples

        iex> get_words_for_range([%{"text" => "Ajax"}, %{"text" => "Tecmessa"}, %{"text" => "Eurysaces"}], 0..2)
        "Ajax Tecmessa"

        iex> get_words_for_range([%{"text" => "Ajax"}, %{"text" => "Tecmessa"}, %{"text" => "Eurysaces"}], [0, 2])
       [%{"text" => "Ajax"}, %{"text" => "Tecmessa"}]

    """
    def get_words_for_range(words, %Range{} = range) do
      words
      |> Enum.slice(range)
    end

    def get_words_for_range(words, [f, l]), do: get_words_for_range(words, f..l)

    @doc """
    Stringifies the `words` for the given range. Useful for building glossae.
    """
    def get_word_text_for_range(words, [f, l]) do
      get_words_for_range(words, f..l)
      |> Enum.map(&Map.get(&1, "text"))
      |> Enum.join(" ")
    end

    @doc """
    Returns the container objects that contain (= whose `word_range`s are not disjoint with) the
    given `range`.

    ## Examples

        iex> filter_containers_within_range(
          [%{"id" => "my_commentary", "word_range" => [3, 10]}, %{"id" => "other_commentary", "word_range" => [11, 20]}],
          4..6
        )
        [%{"id" => "my_commentary", "word_range" => [3, 10]}]

        iex> filter_containers_within_range(
          [%{"id" => "my_commentary", "word_range" => [3, 10]}, %{"id" => "other_commentary", "word_range" => [11, 20]}],
          30..40
        )
        []
    """
    def filter_containers_within_range(containers, %Range{} = range) do
      containers
      |> Enum.filter(fn c ->
        [f | [l]] = Map.get(c, "word_range")

        !Range.disjoint?(f..l, range)
      end)
    end
  end

  def run do
    unless File.dir?(@outpath_prefix) do
      File.mkdir_p!(@outpath_prefix)
    end

    commentaries_config =
      File.read!("config/commentary.toml")
      |> Toml.decode!()

    for commentary_config <- commentaries_config["commentaries"] do
      ingest_commentary(commentary_config)
    end
  end

  def ingest_commentary(commentary_config) do
    ajmc_id = commentary_config["ajmc_id"]
    pytorch_file = GitHub.API.get_pytorch_file!(ajmc_id)
    json = GitHub.API.get_commentary_data!(pytorch_file["download_url"])
    {path, commentary} = create_commentary(pytorch_file["name"], json, commentary_config)

    for comment <- prepare_lemmas_from_canonical_json(json) do
      data = ingest_lemma(commentary, comment)

      if !is_nil(data) and data != :ok do
        s =
          if is_nil(Map.get(data, :lemma)) do
            Templates.lemmaless_comment(data)
          else
            Templates.lemma_comment(data)
          end

        File.write!(path, s <> "\n\n", [:append])
      end
    end
  end

  defp create_commentary(filename, json, commentary_meta) do
    pid = json |> Map.get("id")
    metadata = json |> Map.get("metadata")

    zotero_id = commentary_meta |> Map.get("zotero_id")
    zotero_data = Zotero.API.item(zotero_id)
    zotero_extra = zotero_data |> Map.get("extra", %{})

    creators =
      zotero_data
      |> Map.get("creators")
      |> Enum.map(fn c ->
        %{
          creator_type: Map.get(c, "creatorType"),
          first_name: Map.get(c, "firstName"),
          last_name: Map.get(c, "lastName")
        }
      end)

    edition = zotero_data |> Map.get("edition")
    languages = zotero_data |> Map.get("language") |> String.split(", ")
    place = zotero_data |> Map.get("place")
    publication_date = zotero_data |> Map.get("date")

    public_domain_year =
      if zotero_extra |> Map.get("Public Domain Year") == "n/a" do
        nil
      else
        zotero_extra |> Map.get("Public Domain Year")
      end

    publisher = zotero_data |> Map.get("publisher")

    wikidata_qid = zotero_extra |> Map.get("QID")
    source_url = zotero_data |> Map.get("url")
    title = zotero_data |> Map.get("title")
    urn = zotero_extra |> Map.get("URN")

    zotero_link =
      zotero_data |> Map.get("links", %{}) |> Map.get("alternate", %{}) |> Map.get("href")

    commentary = %{
      creators: creators,
      edition: edition,
      filename: filename,
      languages: languages,
      metadata: Jason.encode!(metadata),
      pid: pid,
      place: place,
      publication_date: publication_date,
      public_domain_year: public_domain_year,
      publisher: publisher,
      source_url: source_url,
      title: title,
      urn: "urn:cts:greekLit:#{urn}",
      wikidata_qid: wikidata_qid,
      zotero_id: zotero_id,
      zotero_link: zotero_link
    }

    md_header = Templates.commentary_header(commentary)
    path = Path.join(@outpath_prefix, "#{urn}.md")

    File.write!(path, md_header <> "\n")

    {path, commentary}
  end

  defp ingest_glossa(commentary, captures, lemma) do
    %{
      "first_line_n" => first_line_n,
      "first_line_offset" => first_line_offset,
      "last_line_n" => last_line_n,
      "last_line_offset" => last_line_offset
    } = captures

    {content, no_content_lemma} = Map.pop(lemma, "content")
    content = content |> String.replace("- ", "")

    if content == "" do
      Logger.warning("No content for #{inspect(lemma)}.")
    else
      lemma_transcript = Map.get(lemma, "lemma")

      citations =
        [first_line_n, last_line_n]
        |> Enum.sort_by(fn
          n when is_binary(n) ->
            n |> String.replace(~r/[[:alpha:]]/u, "") |> String.to_integer()

          n when is_integer(n) ->
            n
        end)

      [start_offset, end_offset] =
        if citations != [first_line_n, last_line_n] do
          [last_line_offset, first_line_offset]
        else
          # If the lemma is on a single line, make sure that the
          # offsets are in text order (left to right)
          if Enum.at(citations, 0) == Enum.at(citations, 1) do
            [first_line_offset, last_line_offset]
            |> Enum.sort_by(fn
              o when is_nil(o) -> 0
              o when is_binary(o) -> String.to_integer(o)
            end)
          else
            [first_line_offset, last_line_offset]
          end
        end
        |> Enum.map(fn
          s when is_nil(s) -> 0
          s when is_binary(s) -> String.to_integer(s)
        end)

      ["urn:cts:greekLit:tlg0011", "tlg003", version_urn] = commentary.urn |> String.split(".")

      base_urn = commentary.urn |> String.replace(version_urn, "ajmc-lj")

      if Map.get(lemma, "label") == "word-anchor" do
        line_1 = Enum.at(citations, 0)
        line_2 = Enum.at(citations, -1)
        line_1_urn = "#{base_urn}:#{line_1}"
        line_2_urn = "#{base_urn}:#{line_2}"

        line_1_obj = @citable_lines |> Enum.find(&(&1["urn"] == line_1_urn))
        line_2_obj = @citable_lines |> Enum.find(&(&1["urn"] == line_2_urn))

        # This find/2 call is a little funky, but it seems like there
        # are some bad data in the offsets. Checking for the end_offset to
        # to line up is one of the ways to work around this problem.
        first_word =
          line_1_obj["words"]
          |> Enum.find(fn w ->
            start_offset == w["offset"] || start_offset == w["offset"] - 1 ||
              end_offset == w["offset"]
          end)

        first_word_index =
          line_1_obj["words"]
          |> Enum.take_while(fn w -> w["offset"] <= first_word["offset"] end)
          |> Enum.filter(fn w -> w["text"] == first_word["text"] end)
          |> Enum.count()

        second_word =
          line_2_obj["words"]
          |> Enum.find(List.last(line_2_obj["words"]), fn w ->
            end_offset == w["offset"] + String.length(w["text"]) ||
              end_offset == w["offset"] + String.length(w["text"]) + 1
          end)

        second_word_index =
          line_2_obj["words"]
          |> Enum.take_while(fn w -> w["offset"] <= second_word["offset"] end)
          |> Enum.filter(fn w -> w["text"] == second_word["text"] end)
          |> Enum.count()

        first_word_s =
          if is_nil(first_word) do
            Logger.warning(
              "Unable to find word for start lemma lemma: #{inspect(lemma)}, line: #{inspect(line_1_obj)}"
            )

            start_offset
          else
            first_word["text"] |> String.replace(~r/[,.'·]/, "")
          end

        first_word_s =
          if first_word_index == 1 do
            first_word_s
          else
            "#{first_word_s}[#{first_word_index}]"
          end

        second_word_s =
          if second_word == first_word && line_1 == line_2 do
            ""
          else
            t = second_word["text"] |> String.replace(~r/[,.'·]/, "")

            if second_word_index == 1 do
              "-#{line_2}@#{t}"
            else
              "-#{line_2}@#{t}[#{second_word_index}]"
            end
          end

        citation_fragment =
          "#{line_1}@#{first_word_s}#{second_word_s}"

        %{
          citable_urn: "#{commentary.urn}:#{citation_fragment}",
          content: content,
          image_paths: no_content_lemma["image_paths"],
          lemma: lemma_transcript,
          overlays: no_content_lemma["overlays"],
          page_ids: no_content_lemma["page_ids"],
          transcript: no_content_lemma["transcript"],
          end_offset: end_offset,
          start_offset: start_offset,
          urn: "#{base_urn}:#{citation_fragment}"
        }
      else
        %{
          citable_urn: "#{commentary.urn}:#{citations |> Enum.dedup() |> Enum.join("-")}",
          content: content,
          image_paths: no_content_lemma["image_paths"],
          overlays: no_content_lemma["overlays"],
          page_ids: no_content_lemma["page_ids"],
          urn: "#{base_urn}:#{citations |> Enum.dedup() |> Enum.join("-")}"
        }
      end
    end
  end

  defp ingest_lemma(
         commentary,
         %{"anchor_target" => anchor_target} = lemma
       )
       when not is_nil(anchor_target) do
    j =
      try do
        Jason.decode!(anchor_target)
      rescue
        _ ->
          Logger.warning(anchor_target: anchor_target, commentary: commentary)
          nil
      end

    if is_map(j) do
      selector = Map.get(j, "selector")

      with %{"first_line_n" => _} = captures <- Regex.named_captures(passage_regex(), selector) do
        ingest_glossa(commentary, captures, lemma)
      end
    else
      Logger.warning(anchor_target: j, commentary: commentary)
    end
  end

  defp ingest_lemma(
         commentary,
         %{"label" => "scope-anchor"} = comment
       ) do
    maybe_line_ns =
      try do
        [first_n, last_n] =
          Map.get(comment, "lemma")
          |> String.replace(~r/\./, "")
          |> String.replace("A", "4")
          |> String.replace("B", "8")
          |> String.replace("S", "5")
          |> String.trim()
          |> String.split("-")

        # Attempt to normalize abbreviated citations like 160-1 to 160-161
        if String.length(last_n) < String.length(first_n) do
          diff = String.length(first_n) - String.length(last_n)

          [first_n, "#{String.slice(first_n, 0, diff)}#{last_n}"]
        else
          [first_n, last_n]
        end
        |> Enum.map(&String.to_integer/1)
      rescue
        _ ->
          Logger.warning(
            reason: "Unable to parse line numbers for scope-anchor",
            comment: comment
          )

          nil
      end

    if maybe_line_ns do
      captures = %{
        "first_line_n" => List.first(maybe_line_ns),
        "first_line_offset" => nil,
        "last_line_n" => List.last(maybe_line_ns),
        "last_line_offset" => nil
      }

      ingest_glossa(commentary, captures, comment)
    end
  end

  defp ingest_lemma(_commentary, _lemma), do: nil

  defp passage_regex,
    do:
      ~r/tei-l@n=(?<first_line_n>\d+)\[(?<first_line_offset>\d+)\]:tei-l@n=(?<last_line_n>\d+)\[(?<last_line_offset>\d+)\]/

  def prepare_lemmas_from_canonical_json(json) do
    children = json |> Map.get("children")

    lemmas =
      children
      |> Map.get("lemmas", [])
      |> Enum.filter(&Enum.member?(~w(scope-anchor word-anchor), Map.get(&1, "label")))

    entities = children |> Map.get("entities", [])
    primary_full_entities = group_primary_full_entities(entities)
    non_primary_full_entities = remove_primary_full_entities(entities, primary_full_entities)

    pages = children |> Map.get("pages")

    words =
      children
      |> Map.get("words")
      |> Enum.with_index(fn el, index ->
        el |> Map.put(:index, index)
      end)

    regions = children |> Map.get("regions")

    regions
    |> Enum.drop_while(&(Map.get(&1, "region_type") != "primary_text"))
    |> Enum.chunk_by(&Map.get(&1, "region_type"))

    commentaries = regions |> Enum.filter(&(Map.get(&1, "region_type") == "commentary"))

    lemmas
    |> Enum.chunk_every(2, 1)
    |> Enum.map(
      &prepare_lemma(
        commentaries,
        pages,
        words,
        primary_full_entities ++ non_primary_full_entities,
        &1
      )
    )
  end

  def group_primary_full_entities(entities) do
    entities
    |> Enum.filter(&(Map.get(&1, "label") == "primary-full"))
    |> Enum.map(fn primary_full ->
      [pf_first, pf_last] = Map.get(primary_full, "word_range")

      # get entities whose ranges overlap with the primary-full
      sub_entities =
        entities
        |> Enum.filter(fn ent ->
          [ent_first, ent_last] = Map.get(ent, "word_range")

          !Range.disjoint?(pf_first..pf_last, ent_first..ent_last) and
            Map.get(ent, "label") in @entity_labels
        end)

      with work <- sub_entities |> Enum.find(&(Map.get(&1, "label") == "work.primlit")),
           scope <- sub_entities |> Enum.find(&(Map.get(&1, "label") == "scope")),
           wikidata_url <- Map.get(work || scope || %{}, "wikidata_id") do
        primary_full
        |> Map.put("wikidata_id", wikidata_url)
        |> Map.put("references", {scope, sub_entities})
      end
    end)
    |> Enum.reject(&is_nil/1)
  end

  def remove_primary_full_entities(entities, primary_full_entities) do
    primary_full_word_ranges =
      primary_full_entities
      |> Enum.map(fn ent ->
        [f, l] = Map.get(ent, "word_range")

        f..l
      end)

    entities
    |> Enum.filter(fn ent ->
      [f, l] = Map.get(ent, "word_range")
      word_range = f..l

      Enum.all?(primary_full_word_ranges, fn r -> Range.disjoint?(r, word_range) end)
    end)
  end

  defp prepare_lemma(commentaries, pages, words, entities, [lemma]) do
    [lemma_first | [lemma_last]] = Map.get(lemma, "word_range")
    lemma_range = lemma_first..lemma_last
    lemma_words = WordRange.get_words_for_range(words, lemma_range)

    commentaries =
      WordRange.filter_containers_within_range(commentaries, lemma_range)

    commentary_ranges = Enum.map(commentaries, &Map.get(&1, "word_range")) |> List.flatten()
    page_range = List.first(commentary_ranges)..List.last(commentary_ranges)
    pages = WordRange.filter_containers_within_range(pages, page_range)

    # The two `Enum.drop_while/2`'s in a row look a bit strange, but we
    # can't combine them: first, we need to drop all words from the
    # commentary region up to the lemma; then, we need to drop the lemma.
    # If we combined them, it would drop all of the words up to the lemma, then
    # drop the lemma, then also drop all of the words after the lemma.
    glossa_words =
      commentaries
      |> Enum.flat_map(&WordRange.get_words_for_range(words, Map.get(&1, "word_range")))
      |> Enum.drop_while(fn w -> !Enum.member?(lemma_words, w) end)
      |> Enum.drop_while(fn w -> Enum.member?(lemma_words, w) end)
      |> Enum.chunk_by(fn w ->
        index = Map.get(w, :index)

        Enum.find(commentaries, fn c ->
          [cf, cl] = Map.get(c, "word_range")

          index in cf..cl
        end)
      end)

    glossa_overlays = calculate_overlays(pages, [lemma_words | glossa_words])

    glossa = make_glossa_from_words(glossa_words, entities)

    lemma_transcript =
      if is_nil(Map.get(lemma, "transcript")) do
        lemma_words |> Enum.map(&Map.get(&1, "text")) |> Enum.join(" ")
      else
        Map.get(lemma, "transcript")
      end

    Map.merge(lemma, %{
      "content" => glossa,
      "lemma" => lemma_transcript,
      "overlays" => glossa_overlays,
      "words" => lemma_words,
      "commentary_word_ranges" => commentaries |> Enum.map(&Map.get(&1, "word_range")),
      "image_paths" =>
        pages
        |> Enum.map(fn p ->
          page_id = Map.get(p, "id")
          commentary_id = page_id |> String.split("_") |> List.first()

          "#{commentary_id}/#{page_id}/full/max/0/default.png"
        end),
      "page_ids" => pages |> Enum.map(&Map.get(&1, "id"))
    })
  end

  defp prepare_lemma(commentaries, pages, words, entities, [lemma, next_lemma]) do
    [lemma_first | [lemma_last]] = Map.get(lemma, "word_range")
    lemma_range = lemma_first..lemma_last
    lemma_words = WordRange.get_words_for_range(words, lemma_range)

    [next_lemma_first | [next_lemma_last]] = Map.get(next_lemma, "word_range")
    next_lemma_range = next_lemma_first..next_lemma_last
    next_lemma_words = WordRange.get_words_for_range(words, next_lemma_range)

    if lemma_first > next_lemma_first or lemma_last > next_lemma_last do
      Logger.error("out of order lemmata: #{inspect(lemma)}\n#{inspect(next_lemma)}")
    end

    commentaries =
      WordRange.filter_containers_within_range(
        commentaries,
        lemma_first..next_lemma_first
      )

    pages =
      WordRange.filter_containers_within_range(
        pages,
        lemma_first..next_lemma_first
      )

    # The two `Enum.drop_while/2`'s in a row look a bit strange, but we
    # can't combine them: first, we need to drop all words from the
    # commentary region up to the lemma; then, we need to drop the lemma.
    # If we combined them, it would drop all of the words up to the lemma, then
    # drop the lemma, then also drop all of the words after the lemma.
    glossa_words =
      commentaries
      |> Enum.flat_map(fn c ->
        WordRange.get_words_for_range(words, Map.get(c, "word_range"))
      end)
      |> Enum.drop_while(fn w -> !Enum.member?(lemma_words, w) end)
      |> Enum.drop_while(fn w -> Enum.member?(lemma_words, w) end)
      |> Enum.take_while(fn w -> !Enum.member?(next_lemma_words, w) end)
      |> Enum.chunk_by(fn w ->
        index = Map.get(w, :index)

        Enum.find(commentaries, fn c ->
          [cf, cl] = Map.get(c, "word_range")

          index in cf..cl
        end)
      end)

    glossa_overlays = calculate_overlays(pages, [lemma_words | glossa_words])

    glossa = make_glossa_from_words(glossa_words, entities)

    lemma_transcript =
      if is_nil(Map.get(lemma, "transcript")) do
        lemma_words |> Enum.map(&Map.get(&1, "text")) |> Enum.join(" ")
      else
        Map.get(lemma, "transcript")
      end

    Map.merge(lemma, %{
      "content" => glossa,
      "lemma" => lemma_transcript,
      "words" => lemma_words,
      "commentary_word_ranges" => commentaries |> Enum.map(&Map.get(&1, "word_range")),
      "overlays" => glossa_overlays,
      "image_paths" =>
        pages
        |> Enum.map(fn p ->
          page_id = Map.get(p, "id")
          commentary_id = page_id |> String.split("_") |> List.first()

          "#{commentary_id}/#{page_id}/full/max/0/default.png"
        end),
      "page_ids" => pages |> Enum.map(&Map.get(&1, "id"))
    })
  end

  # When mapping entities to words, it is important to map
  # `primary-full` references first. Only if the word is not
  # in a `primary-full` should we check if it belongs to some
  # other entity. This is because the `primary-full` references
  # might contain `pers.author` entities, for example, but we
  # can't have overlapping links.

  defp get_entity_for_word(entities, word) do
    entities
    |> Enum.find(fn ent ->
      [f, l] = ent["word_range"]
      word.index in f..l
    end)
  end

  defp make_glossa_from_words(glossa_words, entities) do
    glossa_words
    |> List.flatten()
    |> Enum.map(fn w ->
      {w, get_entity_for_word(entities, w)}
    end)
    |> Enum.chunk_by(fn {_, entity} -> entity end)
    |> Enum.map(fn chunk ->
      entity = chunk |> List.first() |> elem(1)
      words = chunk |> Enum.map(fn {w, _} -> w end)
      text = words |> Enum.map(&Map.get(&1, "text")) |> Enum.join(" ")

      if is_nil(entity) do
        text
      else
        link = get_link_for_entity(entity, words)

        if is_nil(link) do
          Logger.warning("Entity found, but no link provided: #{inspect(chunk)}")
          text
        else
          "[#{text}](#{link})"
        end
      end
    end)
    |> Enum.join(" ")
    |> String.trim()
  end

  def get_link_for_entity(%{"label" => "primary-full"} = entity, words) do
    wikidata_id = Map.get(entity, "wikidata_id")

    case Map.get(@entity_wikidata_to_cts_mapping, wikidata_id, %{}) |> Map.get("cts_urn") do
      "" ->
        wikidata_id

      nil ->
        wikidata_id

      urn ->
        case Map.get(entity, "references") do
          {scope, _subrefs} ->
            "https://scaife.perseus.org/reader/#{urn}#{resolve_scope(scope, words)}"

          _ ->
            "https://scaife.perseus.org/reader/#{urn}"
        end
    end
  end

  def get_link_for_entity(entity, _words) do
    Map.get(entity, "wikidata_id")
  end

  def resolve_scope(scope, _words) when is_nil(scope), do: ""

  def resolve_scope(scope, words) do
    [f, l] = Map.get(scope, "word_range")

    stringified_scope =
      words
      |> Enum.filter(fn w ->
        w.index in f..l
      end)
      |> Enum.map(&Map.get(&1, "text"))
      |> Enum.join("")
      |> String.replace(";", "")
      |> String.replace(":", "")
      |> String.replace("ff.", "")
      |> transform_f()
      |> remove_trailing_character(".")
      |> remove_trailing_character(",")

    ":#{stringified_scope}"
  end

  def remove_trailing_character(s, c) do
    if String.ends_with?(s, c) do
      String.slice(s, 0..-1//1)
    else
      s
    end
  end

  def transform_f(s) do
    if String.ends_with?(s, "f.") do
      without_f = String.replace(s, "f.", "")

      try do
        n = String.to_integer(without_f)
        "#{n}-#{n + 1}"
      rescue
        _ -> without_f
      end
    else
      s
    end
  end

  defp calculate_overlays(pages, words_grouped_by_region) do
    words_grouped_by_region
    |> Enum.flat_map(fn words ->
      words
      |> Enum.chunk_by(fn word ->
        index = Map.get(word, :index)

        Enum.find(pages, fn page ->
          [p_f, p_l] = Map.get(page, "word_range")

          index in p_f..p_l
        end)
      end)
    end)
    |> Enum.map(fn words ->
      word = List.first(words)

      index = Map.get(word, :index)

      page_id =
        Enum.find(pages, fn page ->
          [p_f, p_l] = Map.get(page, "word_range")

          index in p_f..p_l
        end)
        |> Map.get("id")

      bboxes = words |> Enum.map(&Map.get(&1, "bbox"))

      xs =
        bboxes
        |> Enum.flat_map(fn bbox_pair ->
          bbox_pair |> Enum.map(&Enum.at(&1, 0))
        end)

      ys =
        bboxes
        |> Enum.flat_map(fn bbox_pair ->
          bbox_pair |> Enum.map(&Enum.at(&1, 1))
        end)

      left_most = Enum.min(xs)
      right_most = Enum.max(xs)
      top_most = Enum.min(ys)
      bottom_most = Enum.max(ys)

      %{
        px: left_most,
        py: top_most,
        width: right_most - left_most,
        height: bottom_most - top_most,
        page_id: page_id
      }
    end)
  end
end

CanonicalCommentaries.run()
