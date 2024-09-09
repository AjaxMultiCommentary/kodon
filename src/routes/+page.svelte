<h1>Kōdōn</h1>

<figure>
	<p>
		φώνημʼ ἀκούω καὶ ξυναρπάζω φρενὶ<br />
		χαλκοστόμου κώδωνος ὡς Τυρσηνικῆς.
	</p>

	<p>
		I hear your voice and grasp it in my mind<br />
		like the bell of a bronze-mouthed Tyrrhenian trumpet.
	</p>
	<figcaption><cite>Sophocles, <em>Ajax</em>, ll. 16&ndash;17</cite></figcaption>
</figure>

<article id="quick-start">
	<h2>Quick Start</h2>

	<p>
		To get started quickly, you'll want to turn your TEI XML edition into something that plays
		nicely with JavaScript, i.e., JSON. We're working on adding scripts for most common TEI formats,
		but the basic idea is to take your canonical citation unit &mdash; for Sophocles&apos; <em
			>Ajax</em
		>, that's a line &mdash; and turn each of those in the TEI XML into a JSON object in a
		<a href="https://jsonlines.org">JSONL</a>
		file.
	</p>

	<h3>Formatting your text</h3>

	<p>Each line should contain the following properties:</p>

	<ul>
		<li>
			type ("text_container" | "text_element"): For citable text nodes, you'll want to use
			"text_container"; for any annotations that apply to these text containers, such as speaker
			tags, notes, or editorial markings, use "text_element".
		</li>
		<li>
			type = "text_container"
			<ul>
				<li>
					offset (integer): The location of this textual piece relative to the start of the text.
					Generally, it's sufficient to use the index of the node in your array or stream of text
					nodes.
				</li>
				<li>
					subtype ("line" | "paragraph" | "quote"): The subtype describes the basic unit of text,
					often called a "block-level element," which will contain other block-level elements or
					inline runs of text.
				</li>
				<li>
					location (Array[string]): The full citation for the node in the work. For tragedy, this is
					a one-element array. For a work like a dialogue of Plato, the location can have two or
					three elements (depending on the dialogue), e.g., ["97", "b"] or ["1", "384", "c"]. Kōdōn
					includes basic support for the Stephanus and Bekker systems; additional supports are
					coming soon. (This is part of the reason that we also suggest specifying an offset: the
					offset can be used to order the text nodes unambiguously.)
				</li>
				<li>
					text (string | TextContainer[]): The plain, unannotated text at this location <em>or</em>
					an array of other
					<pre>TextContainer</pre>
					objects. Annotations should be stored in "text_element" objects.
				</li>
			</ul>
		</li>
		<li>
			type = "text_element"
			<ul>
				<li>
					attributes (object): Any attributes necessary for rendering the text element correctly.
					For example, a speaker tag might have a "name" attribute.
				</li>
				<li>line_offset (integer): The `offset` of the line that this text element annotates.</li>
				<li>
					start_offset (integer): The character offset in the annotated line where this text element
					should start.
				</li>
				<li>
					end_offset (integer): The character offset in the annotated line where this text element
					should end.
				</li>
				<li>
					subtype (string): A more specific reference to the text element's function. Generally,
					you'll just want to use the name of the TEI XML tag here ("speaker", "note", "del", "add",
					etc.).
				</li>
			</ul>
		</li>
	</ul>

	<h3>Config</h3>

	<p>
		Configuration takes place in a `config/commentaries.toml` file. It looks something like this:
	</p>

	<pre>
        title = "_Ajax_ Multi-Commentary"
        description = "A digital platform for the comparative analysis of commentaries on Sophocles’ _Ajax_"
        bibliographies_directory = "bibliographies"
        commentaries_directory = "commentaries"
        editions_directory = "out/editions"
        home_page = "pages/home.md"

        [[static_pages]]
        title = "Bibliography"
        path = "/bibliography"
        file_path = ""

        [[static_pages]]
        title = "About"
        path = "/about"
        file_path = "pages/about.md"

        [[table_of_contents]]    
        label = "Prologue" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:1-133" 
        ref = "vv. 1-133"

        [[table_of_contents]]
        label = "*Parodos*" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:144-200" 
        ref = "vv. 144-200"

        [[table_of_contents]]
        label = "First episode" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:201-595" 
        ref = "vv. 201-595"

        [[table_of_contents]]
        label = "First *stasimon*" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:596-645" 
        ref = "vv. 596-645"

        [[table_of_contents]]
        label = "Second episode" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:646-692" 
        ref = "vv. 646-692"

        [[table_of_contents]]
        label = "Second *stasimon*" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:693-718" 
        ref = "vv. 693-718"

        [[table_of_contents]]
        label = "Third episode" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:719-865" 
        ref = "vv. 719-865"

        [[table_of_contents]]
        label = "*Epiparodos* and *kommos*" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:866-973" 
        ref = "vv. 866-973"

        [[table_of_contents]]
        label = "Fourth episode" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:974-1184" 
        ref = "vv. 974-1184"

        [[table_of_contents]]
        label = "Third *stasimon*" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:1185-1222" 
        ref = "vv. 1185-1222"

        [[table_of_contents]]
        label = "*Exodos*" 
        urn = "urn:cts:greekLit:tlg0011.tlg003:1223-1420" 
        ref = "vv. 1223-1420"

        [[editions]]
        description = "Sophocles' *Ajax*, edited by Hugh Lloyd-Jones"
        filename = "tlg0011.tlg003.ajmc-lj.xml"
        label = "Lloyd-Jones (1994)"
        urn = "urn:cts:greekLit:tlg0011.tlg003.ajmc-lj"

        [[editions]]
        description = "Sophoclis Aiax: commentario perpetuo illustravit Christ. Augustus Lobeck. Editio Tertia. Edited by Francis Storr"
        filename = "tlg0011.tlg003.1st1K-grc1.xml"
        label = "Lobeck (1866)"
        urn = "urn:cts:greekLit:tlg0011.tlg003.ajmc-lobeck"

        [[editions]]
        description = "Sophoclis Fabulae: recognovit brevique adnotatione critica instruxit, edited by A. C. Pearson"
        filename = "tlg0011.tlg003.opp-grc1.xml"
        label = "Pearson (1924)"
        urn = "urn:cts:greekLit:tlg0011.tlg003.ajmc-pearson"
    </pre>
</article>
