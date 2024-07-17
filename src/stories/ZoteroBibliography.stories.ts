import type { Meta, StoryObj } from '@storybook/svelte';
import ZoteroBibliography from '$lib/components/ZoteroBibliography.svelte';

const meta = {
	component: ZoteroBibliography,
	tags: ['autodocs']
} satisfies Meta<ZoteroBibliography>;

export default meta;

type Story = StoryObj<typeof meta>;

const bibliographies = [
	{
		name: 'Ajax Multi-Commentary',
		items: [
			{
				id: 'garvie_sophocles_1998',
				type: 'book',
				'event-place': 'Warminster',
				ISBN: '978-0-85668-659-7',
				language: 'eng, grc',
				note: 'QID: Q123517585\nPublic Domain Year: n/a\nURN: tlg0011.tlg003.ajmc-gar',
				publisher: 'Aris & Phillips',
				'publisher-place': 'Warminster',
				title: 'Sophocles: Ajax',
				author: [
					{
						family: 'Garvie',
						given: 'Alex F.'
					}
				],
				issued: {
					'date-parts': [['1998']]
				}
			},
			{
				id: 'untersteiner_sofocle_1934',
				type: 'book',
				'event-place': 'Milano',
				language: 'ita, grc',
				note: 'QID: Q123464159\nPublic Domain Year: 2051\nURN: tlg0011.tlg003.ajmc-unt',
				publisher: 'Carlo Signorelli Editore',
				'publisher-place': 'Milano',
				title: 'Sofocle. Aiace',
				author: [
					{
						family: 'Untersteiner',
						given: 'Mario'
					}
				],
				issued: {
					'date-parts': [['1934']]
				}
			},
			{
				id: 'schneidewin_sophokles_1913',
				type: 'book',
				'event-place': 'Berlin',
				language: 'ita',
				note: 'QID: Q123916470\nPublic Domain Year: 1962\nURN: tlg0011.tlg003.ajmc-snr',
				'publisher-place': 'Berlin',
				title: 'Sophokles',
				author: [
					{
						family: 'Schneidewin',
						given: 'F. W.'
					},
					{
						family: 'Nauck',
						given: 'A.'
					},
					{
						family: 'Radermacher',
						given: 'L.'
					}
				],
				issued: {
					'date-parts': [['1913']]
				}
			},
			{
				id: 'paduano_tragedie_1982',
				type: 'book',
				'event-place': 'Torino',
				language: 'ita, grc',
				note: 'QID: Q123679678\nPublic Domain Year: n/a\nURN: tlg0011.tlg003.ajmc-pad',
				publisher: 'UTET',
				'publisher-place': 'Torino',
				title: 'Tragedie e Frammenti di Sofocle',
				author: [
					{
						family: 'Paduano',
						given: 'Guido'
					}
				],
				issued: {
					'date-parts': [['1982']]
				}
			},
			{
				id: 'stanford_sophocles_1979',
				type: 'book',
				'event-place': 'New York, NY, USA',
				language: 'eng, grc',
				note: 'original-date: 1963\nQID: Q123679677\nPublic Domain Year: 2054\nURN: tlg0011.tlg003.ajmc-sta',
				publisher: 'Arno Press',
				'publisher-place': 'New York, NY, USA',
				title: 'Sophocles Ajax',
				author: [
					{
						family: 'Stanford',
						given: 'William Bedell'
					}
				],
				issued: {
					'date-parts': [['1979']]
				}
			},
			{
				id: 'colonna_sophoclis_1975',
				type: 'book',
				'collection-title': 'Corpus Scriptorum Graecorum Paravianum',
				'event-place': 'Torino',
				language: 'ita',
				note: 'QID: Q123916472\nPublic Domain Year: 2069\nURN: tlg0011.tlg003.ajmc-col',
				publisher: 'Paravia',
				'publisher-place': 'Torino',
				title: 'Sophoclis fabulae: Aiax - Electra',
				volume: '1',
				author: [
					{
						family: 'Colonna',
						given: 'Aristides'
					}
				],
				issued: {
					'date-parts': [['1975']]
				}
			}
		]
	},
	{
		name: 'Ajax Meta-Commentary',
		items: [
			{
				id: 'jebb_sophocles_1896',
				type: 'book',
				abstract: 'Book digitized by Google and uploaded to the Internet Archive by user tpb.',
				'event-place': 'London',
				language: 'eng, grc',
				note: 'QID: Q123679675\nPublic Domain Year: 1975\nURN: tlg0011.tlg003.ajmc-jeb',
				'number-of-pages': '354',
				publisher: 'Cambridge University Press',
				'publisher-place': 'London',
				source: 'Internet Archive',
				title: 'Sophocles: The Plays and Fragments',
				URL: 'http://archive.org/details/sophoclesplaysa05campgoog',
				author: [
					{
						family: 'Jebb',
						given: 'Richard Claverhouse'
					}
				],
				accessed: {
					'date-parts': [['2020', 11, 9]]
				},
				issued: {
					'date-parts': [['1896']]
				}
			},
			{
				id: 'ferrari_aiace_1974',
				type: 'book',
				'event-place': 'Torino, Italie',
				language: 'ita, grc',
				note: 'QID: Q122238857\nPublic Domain Year: 2093\nURN: tlg0011.tlg003.ajmc-fer',
				publisher: 'Loescher Editore',
				'publisher-place': 'Torino, Italie',
				title: "L'Aiace",
				author: [
					{
						family: 'Ferrari',
						given: 'Franco'
					}
				],
				issued: {
					'date-parts': [['1974']]
				}
			},
			{
				id: 'kamerbeek_plays_1963a',
				type: 'book',
				edition: '2',
				'event-place': 'Leiden',
				language: 'eng, grc',
				note: 'QID: Q122238739\nPublic Domain Year: 2068\nURN: tlg0011.tlg003.ajmc-kam',
				publisher: 'E.J. Brill',
				'publisher-place': 'Leiden',
				title: 'The Plays of Sophocles: Commentaries',
				'title-short': 'The Plays of Sophocles',
				author: [
					{
						family: 'Kamerbeek',
						given: 'Jan Coenraad'
					}
				],
				issued: {
					'date-parts': [['1963']]
				}
			},
			{
				id: 'schneidewin_sophokles_1853',
				type: 'book',
				'event-place': 'Leipzig',
				language: 'ger, grc',
				note: 'QID: Q123679673\nPublic Domain Year: 1926\nURN: tlg0011.tlg003.ajmc-sch',
				publisher: 'Weidmann',
				'publisher-place': 'Leipzig',
				title: 'Sophokles',
				URL: 'https://archive.org/details/sophokle1v3soph',
				volume: '1',
				author: [
					{
						family: 'Schneidewin',
						given: 'Friedrich Wilhelm'
					}
				],
				issued: {
					'date-parts': [['1853']]
				}
			},
			{
				id: 'wecklein_tragodien_1894',
				type: 'book',
				'event-place': 'München',
				language: 'ger, grc',
				note: 'QID: Q122229107\nPublic Domain Year: 1996\nURN: tlg0011.tlg003.ajmc-wec',
				publisher: 'Lindauer',
				'publisher-place': 'München',
				title:
					'Die Tragödien des Sophokles / zum Schulgebrauch mit erklärenden Anmerkungen versehen von N. Wecklein',
				volume: '4',
				author: [
					{
						family: 'Wecklein',
						given: 'Nikolaus'
					}
				],
				issued: {
					'date-parts': [['1894']]
				}
			},
			{
				id: 'finglass_sophocles_2011',
				type: 'book',
				'event-place': 'Cambridge',
				ISBN: '978-1-107-67671-8',
				language: 'eng, grc',
				note: 'QID: Q58627799\nPublic Domain Year: n/a\nURN: tlg0011.tlg003.ajmc-fin',
				publisher: 'Cambridge University Press',
				'publisher-place': 'Cambridge',
				source: 'Open WorldCat',
				title: 'Sophocles: Ajax',
				author: [
					{
						family: 'Finglass',
						given: 'Patrick John'
					}
				],
				issued: {
					'date-parts': [['2011']]
				}
			},
			{
				id: 'demont_aias_2022',
				type: 'book',
				abstract:
					'Aïas (ou Ajax) est un soldat perdu. À Troie, Ulysse et les Atrides n’ont pas reconnu sa valeur : il a voulu les tuer pour venger son honneur, mais la déesse Athéna l’a rendu fou. Dans le prologue, Athéna montre sa folie à Ulysse terrorisé. Puis Sophocle met en scène son désespoir quand il revient à la raison. Pour restaurer son honneur, il ne voit qu’une solution : le suicide, malgré les objurgations du choeur de ses marins et de Tecmesse, sa compagne. Il en assure la réalisation par une feinte qui les trompe, et se donne la mort, seul, devant le public. Son cadavre est découvert par les siens, qui étaient partis en désordre à sa recherche, et par son demi-frère Teucros, arrivé trop tard. Celui-ci veut l’ensevelir malgré l’interdiction des Atrides. Il obtient l’appui inattendu d’Ulysse : on rend donc son honneur au héros, dont un convoi funèbre, accompagné par son jeune fils, emporte le corps.\n\nCette édition de la pièce de Sophocle propose un texte revu, une traduction nouvelle et un commentaire suivi, qui discute les nombreux problèmes qu’elle pose, en particulier pour sa mise en scène. L’introduction explique pourquoi est choisie ici la graphie Aïas, expose l’arrière-plan homérique et post-homérique du mythe, et l’importance du « héros » pour l’île d’Égine, l’île de Salamine et pour les Athéniens eux-mêmes. Elle analyse le rôle de la noblesse transmise par filiation patrilinéaire, même chez ceux qu’on traite de « bâtards », et la place laissée aux femmes. Cette terrifiante et pitoyable tragédie de l’honneur et de la mort, qui n’est pas, contrairement à d’autres pièces, encombrée par sa postérité, aide à comprendre le « personnage tragique » et « l’effet tragique » selon les Anciens, et pour Sophocle.',
				'collection-title': 'Commentario',
				'event-place': 'Paris',
				ISBN: '978-2-251-45277-7',
				language: 'fra, grc',
				note: 'QID: Q118954375\nPublic Domain Year: n/a',
				publisher: 'Les Belles Lettres',
				'publisher-place': 'Paris',
				title: 'Aïas / Ajax - Sophocle',
				URL: 'https://www.lesbelleslettres.com/livre/9782251452777/aias-ajax',
				author: [
					{
						family: 'Demont',
						given: 'Paul'
					}
				],
				accessed: {
					'date-parts': [['2023', 6, 1]]
				},
				issued: {
					'date-parts': [['2022', 2, 18]]
				}
			},
			{
				id: 'campbell_sophocles_1881',
				type: 'book',
				'event-place': 'Oxford',
				language: 'eng, grc',
				note: 'QID: Q123679674\nPublic Domain Year: 1978\nURN: tlg0011.tlg003.ajmc-cam',
				'number-of-pages': '612',
				publisher: 'Clarendon Press',
				'publisher-place': 'Oxford',
				source: 'Internet Archive',
				title: 'Sophocles',
				URL: 'http://archive.org/details/cu31924087948174',
				volume: '2',
				author: [
					{
						family: 'Campbell',
						given: 'Lewis'
					}
				],
				accessed: {
					'date-parts': [['2020', 12, 30]]
				},
				issued: {
					'date-parts': [['1881']]
				}
			},
			{
				id: 'lobeck_sophoclis_1835',
				type: 'book',
				edition: '2',
				'event-place': 'Leipzig',
				language: 'lat, grc',
				note: 'QID: Q123464295\nPublic Domain Year: 1930\nEditions: 1st ed. 1809; 2nd ed. 1835 (Leipzig); 3rd ed. 1866 (Berlin).\nURN: tlg0011.tlg003.ajmc-lob',
				publisher: 'Weidmann',
				'publisher-place': 'Leipzig',
				title: 'Sophoclis Aiax',
				author: [
					{
						family: 'Lobeck',
						given: 'Christian August'
					}
				],
				issued: {
					'date-parts': [['1835']]
				}
			},
			{
				id: 'hermann_sophoclis_1851',
				type: 'book',
				edition: '4',
				'event-place': 'Leipzig',
				language: 'ger, grc',
				note: 'QID: Q123679676\nPublic Domain Year: 1918\nURN: tlg0011.tlg003.ajmc-her',
				publisher: 'Ernsto Fleischer',
				'publisher-place': 'Leipzig',
				title: 'Sophoclis Aiax',
				author: [
					{
						family: 'Hermann',
						given: 'Gottfried'
					}
				],
				issued: {
					'date-parts': [['1851']]
				}
			},
			{
				id: 'tournier_tragedies_1886',
				type: 'book',
				edition: '3',
				'event-place': 'Paris',
				language: 'fra, grc',
				note: 'QID: Q123464638\nPublic Domain Year: 1969\nURN: tlg0011.tlg003.ajmc-tou',
				publisher: 'Librairie Hachette et Cie',
				'publisher-place': 'Paris',
				title: 'Les tragédies de Sophocle',
				author: [
					{
						family: 'Tournier',
						given: 'Édouard'
					}
				],
				issued: {
					'date-parts': [['1886']]
				}
			},
			{
				id: 'deromilly_sophocle_1976',
				type: 'book',
				'call-number': 'HA 527/17 875SOPHOC7Aia, BLA 926 875SOPHOC7Aia, 875.SOPH',
				'collection-title': 'Erasme. Collection de textes grecs commentés 17',
				'event-place': 'Paris',
				language: 'fra, grc',
				note: 'QID: Q118976611\nPublic Domain Year: 2080\nURN: tlg0011.tlg003.ajmc-rom',
				publisher: 'Presses universitaires de France',
				'publisher-place': 'Paris',
				title: 'Sophocle, Ajax',
				author: [
					{
						family: 'Romilly',
						given: 'Jacqueline',
						'non-dropping-particle': 'de'
					}
				],
				issued: {
					'date-parts': [['1976']]
				}
			}
		]
	}
];

export const DefaultBibliography: Story = {
	args: {
		bibliographies
	}
};

const chicagoStyleCsl = `
<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="display-and-sort" page-range-format="chicago">
  <info>
    <title>Chicago Manual of Style 17th edition (author-date)</title>
    <id>http://www.zotero.org/styles/chicago-author-date</id>
    <link href="http://www.zotero.org/styles/chicago-author-date" rel="self"/>
    <link href="http://www.chicagomanualofstyle.org/tools_citationguide.html" rel="documentation"/>
    <author>
      <name>Julian Onions</name>
      <email>julian.onions@gmail.com</email>
    </author>
    <contributor>
      <name>Sebastian Karcher</name>
    </contributor>
    <contributor>
      <name>Richard Karnesky</name>
      <email>karnesky+zotero@gmail.com</email>
      <uri>http://arc.nucapt.northwestern.edu/Richard_Karnesky</uri>
    </contributor>
    <contributor>
      <name>Andrew Dunning</name>
      <uri>https://orcid.org/0000-0003-0464-5036</uri>
    </contributor>
    <contributor>
      <name>Matthew Roth</name>
      <email>matthew.g.roth@yale.edu</email>
      <uri> https://orcid.org/0000-0001-7902-6331</uri>
    </contributor>
    <contributor>
      <name>Brenton M. Wiernik</name>
    </contributor>
    <contributor>
      <name>Zeping Lee</name>
      <email>zepinglee@gmail.com</email>
    </contributor>
    <category citation-format="author-date"/>
    <category field="generic-base"/>
    <summary>The author-date variant of the Chicago style</summary>
    <updated>2024-05-09T13:08:37+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <locale xml:lang="en">
    <terms>
      <term name="editor" form="verb-short">ed.</term>
      <term name="container-author" form="verb">by</term>
      <term name="translator" form="verb-short">trans.</term>
      <term name="editortranslator" form="verb">edited and translated by</term>
      <term name="translator" form="short">trans.</term>
    </terms>
  </locale>
  <locale xml:lang="pt-PT">
    <terms>
      <term name="accessed">acedido a</term>
    </terms>
  </locale>
  <locale xml:lang="pt">
    <terms>
      <term name="editor" form="verb">editado por</term>
      <term name="editor" form="verb-short">ed.</term>
      <term name="container-author" form="verb">por</term>
      <term name="translator" form="verb-short">traduzido por</term>
      <term name="translator" form="short">trad.</term>
      <term name="editortranslator" form="verb">editado e traduzido por</term>
      <term name="and">e</term>
      <term name="no date" form="long">s.d</term>
      <term name="no date" form="short">s.d.</term>
      <term name="in">em</term>
      <term name="at">em</term>
      <term name="by">por</term>
    </terms>
  </locale>
  <macro name="secondary-contributors">
    <choose>
      <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="none">
        <group delimiter=". ">
          <names variable="editor translator" delimiter=". ">
            <label form="verb" text-case="capitalize-first" suffix=" "/>
            <name and="text" delimiter=", "/>
          </names>
          <names variable="director" delimiter=". ">
            <label form="verb" text-case="capitalize-first" suffix=" "/>
            <name and="text" delimiter=", "/>
          </names>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="container-contributors">
    <choose>
      <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
        <group prefix=", " delimiter=", ">
          <names variable="container-author" delimiter=", ">
            <label form="verb" suffix=" "/>
            <name and="text" delimiter=", "/>
          </names>
          <names variable="editor translator" delimiter=", ">
            <label form="verb" suffix=" "/>
            <name and="text" delimiter=", "/>
          </names>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="editor">
    <names variable="editor">
      <name name-as-sort-order="first" and="text" sort-separator=", " delimiter=", " delimiter-precedes-last="always"/>
      <label form="short" prefix=", "/>
    </names>
  </macro>
  <macro name="translator">
    <names variable="translator">
      <name name-as-sort-order="first" and="text" sort-separator=", " delimiter=", " delimiter-precedes-last="always"/>
      <label form="short" prefix=", "/>
    </names>
  </macro>
  <macro name="recipient">
    <choose>
      <if type="personal_communication">
        <choose>
          <if variable="genre">
            <text variable="genre" text-case="capitalize-first"/>
          </if>
          <else>
            <text term="letter" text-case="capitalize-first"/>
          </else>
        </choose>
      </if>
    </choose>
    <names variable="recipient" delimiter=", ">
      <label form="verb" prefix=" " text-case="lowercase" suffix=" "/>
      <name and="text" delimiter=", "/>
    </names>
  </macro>
  <macro name="substitute-title">
    <choose>
      <if type="article-magazine article-newspaper review review-book" match="any">
        <text macro="container-title"/>
      </if>
    </choose>
  </macro>
  <macro name="contributors">
    <group delimiter=". ">
      <names variable="author">
        <name and="text" name-as-sort-order="first" sort-separator=", " delimiter=", " delimiter-precedes-last="always"/>
        <label form="short" prefix=", "/>
        <substitute>
          <names variable="editor"/>
          <names variable="translator"/>
          <names variable="director"/>
          <text macro="substitute-title"/>
          <text macro="title"/>
        </substitute>
      </names>
      <text macro="recipient"/>
    </group>
  </macro>
  <macro name="contributors-short">
    <names variable="author">
      <name form="short" and="text" delimiter=", " initialize-with=". "/>
      <substitute>
        <names variable="editor"/>
        <names variable="translator"/>
        <names variable="director"/>
        <text macro="substitute-title"/>
        <text macro="title"/>
      </substitute>
    </names>
  </macro>
  <macro name="interviewer">
    <names variable="interviewer" delimiter=", ">
      <label form="verb" prefix=" " text-case="capitalize-first" suffix=" "/>
      <name and="text" delimiter=", "/>
    </names>
  </macro>
  <macro name="archive">
    <group delimiter=". ">
      <text variable="archive_location" text-case="capitalize-first"/>
      <text variable="archive"/>
      <text variable="archive-place"/>
    </group>
  </macro>
  <macro name="access">
    <group delimiter=". ">
      <choose>
        <if type="graphic report" match="any">
          <text macro="archive"/>
        </if>
        <else-if type="article-journal bill book chapter legal_case legislation motion_picture paper-conference" match="none">
          <text macro="archive"/>
        </else-if>
      </choose>
      <choose>
        <if type="webpage post-weblog" match="any">
          <date variable="issued" form="text"/>
        </if>
      </choose>
      <choose>
        <if variable="issued" match="none">
          <group delimiter=" ">
            <text term="accessed" text-case="capitalize-first"/>
            <date variable="accessed" form="text"/>
          </group>
        </if>
      </choose>
      <choose>
        <if type="legal_case" match="none">
          <choose>
            <if variable="DOI">
              <text variable="DOI" prefix="https://doi.org/"/>
            </if>
            <else>
              <text variable="URL"/>
            </else>
          </choose>
        </if>
      </choose>
    </group>
  </macro>
  <macro name="title">
    <choose>
      <if variable="title" match="none">
        <choose>
          <if type="personal_communication speech thesis" match="none">
            <text variable="genre" text-case="capitalize-first"/>
          </if>
        </choose>
      </if>
      <else-if type="bill book graphic legislation motion_picture song" match="any">
        <text variable="title" text-case="title" font-style="italic"/>
        <group prefix=" (" suffix=")" delimiter=" ">
          <text term="version"/>
          <text variable="version"/>
        </group>
      </else-if>
      <else-if variable="reviewed-author">
        <choose>
          <if variable="reviewed-title">
            <group delimiter=". ">
              <text variable="title" text-case="title" quotes="true"/>
              <group delimiter=", ">
                <text variable="reviewed-title" text-case="title" font-style="italic" prefix="Review of "/>
                <names variable="reviewed-author">
                  <label form="verb-short" text-case="lowercase" suffix=" "/>
                  <name and="text" delimiter=", "/>
                </names>
              </group>
            </group>
          </if>
          <else>
            <group delimiter=", ">
              <text variable="title" text-case="title" font-style="italic" prefix="Review of "/>
              <names variable="reviewed-author">
                <label form="verb-short" text-case="lowercase" suffix=" "/>
                <name and="text" delimiter=", "/>
              </names>
            </group>
          </else>
        </choose>
      </else-if>
      <else-if type="legal_case interview patent" match="any">
        <text variable="title"/>
      </else-if>
      <else>
        <text variable="title" text-case="title" quotes="true"/>
      </else>
    </choose>
  </macro>
  <macro name="edition">
    <choose>
      <if type="bill book graphic legal_case legislation motion_picture report song" match="any">
        <choose>
          <if is-numeric="edition">
            <group delimiter=" " prefix=". ">
              <number variable="edition" form="ordinal"/>
              <text term="edition" form="short" strip-periods="true"/>
            </group>
          </if>
          <else>
            <text variable="edition" text-case="capitalize-first" prefix=". "/>
          </else>
        </choose>
      </if>
      <else-if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
        <choose>
          <if is-numeric="edition">
            <group delimiter=" " prefix=", ">
              <number variable="edition" form="ordinal"/>
              <text term="edition" form="short"/>
            </group>
          </if>
          <else>
            <text variable="edition" prefix=", "/>
          </else>
        </choose>
      </else-if>
    </choose>
  </macro>
  <macro name="locators">
    <choose>
      <if type="article-journal">
        <choose>
          <if variable="volume">
            <text variable="volume" prefix=" "/>
            <group prefix=" (" suffix=")">
              <choose>
                <if variable="issue">
                  <text variable="issue"/>
                </if>
                <else>
                  <date variable="issued">
                    <date-part name="month"/>
                  </date>
                </else>
              </choose>
            </group>
          </if>
          <else-if variable="issue">
            <group delimiter=" " prefix=", ">
              <text term="issue" form="short"/>
              <text variable="issue"/>
              <date variable="issued" prefix="(" suffix=")">
                <date-part name="month"/>
              </date>
            </group>
          </else-if>
          <else>
            <date variable="issued" prefix=", ">
              <date-part name="month"/>
            </date>
          </else>
        </choose>
      </if>
      <else-if type="legal_case">
        <text variable="volume" prefix=", "/>
        <text variable="container-title" prefix=" "/>
        <text variable="page" prefix=" "/>
      </else-if>
      <else-if type="bill book graphic legal_case legislation motion_picture report song" match="any">
        <group prefix=". " delimiter=". ">
          <group>
            <text term="volume" form="short" text-case="capitalize-first" suffix=" "/>
            <number variable="volume" form="numeric"/>
          </group>
          <group>
            <number variable="number-of-volumes" form="numeric"/>
            <text term="volume" form="short" prefix=" " plural="true"/>
          </group>
        </group>
      </else-if>
      <else-if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
        <choose>
          <if variable="page" match="none">
            <group prefix=". ">
              <text term="volume" form="short" text-case="capitalize-first" suffix=" "/>
              <number variable="volume" form="numeric"/>
            </group>
          </if>
        </choose>
      </else-if>
    </choose>
  </macro>
  <macro name="locators-chapter">
    <choose>
      <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
        <choose>
          <if variable="page">
            <group prefix=", ">
              <text variable="volume" suffix=":"/>
              <text variable="page"/>
            </group>
          </if>
        </choose>
      </if>
    </choose>
  </macro>
  <macro name="locators-article">
    <choose>
      <if type="article-newspaper">
        <group prefix=", " delimiter=", ">
          <group delimiter=" ">
            <text variable="edition"/>
            <text term="edition"/>
          </group>
          <group>
            <text term="section" form="short" suffix=" "/>
            <text variable="section"/>
          </group>
        </group>
      </if>
      <else-if type="article-journal">
        <choose>
          <if variable="volume">
            <choose>
              <if variable="issue">
                <text variable="page" prefix=": "/>
              </if>
              <else>
                <!-- CMoS 15.48: If the month or season is included, it is
                  enclosed in parentheses, and a space follows the colon.
                  Unfortunately we can't check the month in CSL v1.0.2.
                -->
                <text variable="page" prefix=":"/>
              </else>
            </choose>
          </if>
          <else>
            <text variable="page" prefix=", "/>
          </else>
        </choose>
      </else-if>
    </choose>
  </macro>
  <macro name="point-locators">
    <choose>
      <if variable="locator">
        <choose>
          <if locator="page" match="none">
            <choose>
              <if type="bill book graphic legal_case legislation motion_picture report song" match="any">
                <choose>
                  <if variable="volume">
                    <group>
                      <text term="volume" form="short" suffix=" "/>
                      <number variable="volume" form="numeric"/>
                      <label variable="locator" form="short" prefix=", " suffix=" "/>
                    </group>
                  </if>
                  <else>
                    <label variable="locator" form="short" suffix=" "/>
                  </else>
                </choose>
              </if>
              <else>
                <label variable="locator" form="short" suffix=" "/>
              </else>
            </choose>
          </if>
          <else-if type="bill book graphic legal_case legislation motion_picture report song" match="any">
            <number variable="volume" form="numeric" suffix=":"/>
          </else-if>
        </choose>
        <text variable="locator"/>
      </if>
    </choose>
  </macro>
  <macro name="container-prefix">
    <text term="in" text-case="capitalize-first"/>
  </macro>
  <macro name="container-title">
    <choose>
      <if type="chapter entry-dictionary entry-encyclopedia paper-conference" match="any">
        <text macro="container-prefix" suffix=" "/>
      </if>
    </choose>
    <choose>
      <if type="webpage">
        <text variable="container-title" text-case="title"/>
      </if>
      <else-if type="legal_case" match="none">
        <group delimiter=" ">
          <text variable="container-title" text-case="title" font-style="italic"/>
          <choose>
            <if type="post-weblog">
              <text value="(blog)"/>
            </if>
          </choose>
        </group>
      </else-if>
    </choose>
  </macro>
  <macro name="publisher">
    <group delimiter=": ">
      <text variable="publisher-place"/>
      <text variable="publisher"/>
    </group>
  </macro>
  <macro name="date">
    <choose>
      <if variable="issued">
        <group delimiter=" ">
          <date variable="original-date" form="text" date-parts="year" prefix="(" suffix=")"/>
          <date variable="issued">
            <date-part name="year"/>
          </date>
        </group>
        <text variable="year-suffix"/>
      </if>
      <else-if variable="status">
        <text variable="status" text-case="capitalize-first"/>
        <text variable="year-suffix" prefix="-"/>
      </else-if>
      <else>
        <text term="no date" form="short"/>
        <text variable="year-suffix" prefix="-"/>
      </else>
    </choose>
  </macro>
  <macro name="date-in-text">
    <choose>
      <if variable="issued">
        <group delimiter=" ">
          <date variable="original-date" form="text" date-parts="year" prefix="[" suffix="]"/>
          <date variable="issued">
            <date-part name="year"/>
          </date>
        </group>
        <text variable="year-suffix"/>
      </if>
      <else-if variable="status">
        <text variable="status"/>
        <text variable="year-suffix" prefix="-"/>
      </else-if>
      <else>
        <text term="no date" form="short"/>
        <text variable="year-suffix" prefix="-"/>
      </else>
    </choose>
  </macro>
  <macro name="date-sort">
    <date variable="issued">
      <date-part name="year"/>
    </date>
  </macro>
  <macro name="day-month">
    <date variable="issued">
      <date-part name="month"/>
      <date-part name="day" prefix=" "/>
    </date>
  </macro>
  <macro name="collection-title">
    <choose>
      <if match="none" type="article-journal">
        <choose>
          <if match="none" is-numeric="collection-number">
            <group delimiter=", ">
              <text variable="collection-title" text-case="title"/>
              <text variable="collection-number"/>
            </group>
          </if>
          <else>
            <group delimiter=" ">
              <text variable="collection-title" text-case="title"/>
              <text variable="collection-number"/>
            </group>
          </else>
        </choose>
      </if>
    </choose>
  </macro>
  <macro name="collection-title-journal">
    <choose>
      <if type="article-journal">
        <group delimiter=" ">
          <text variable="collection-title"/>
          <text variable="collection-number"/>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="event">
    <group delimiter=" ">
      <choose>
        <if variable="genre">
          <text term="presented at"/>
        </if>
        <else>
          <text term="presented at" text-case="capitalize-first"/>
        </else>
      </choose>
      <text variable="event"/>
    </group>
  </macro>
  <macro name="description">
    <choose>
      <if variable="interviewer" type="interview" match="any">
        <group delimiter=". ">
          <text macro="interviewer"/>
          <text variable="medium" text-case="capitalize-first"/>
        </group>
      </if>
      <else-if type="patent">
        <group delimiter=" " prefix=". ">
          <text variable="authority"/>
          <text variable="number"/>
        </group>
      </else-if>
      <else>
        <text variable="medium" text-case="capitalize-first" prefix=". "/>
      </else>
    </choose>
    <choose>
      <if variable="title" match="none"/>
      <else-if type="thesis personal_communication speech" match="any"/>
      <else>
        <group delimiter=" " prefix=". ">
          <text variable="genre" text-case="capitalize-first"/>
          <choose>
            <if type="report">
              <text variable="number"/>
            </if>
          </choose>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="issue">
    <choose>
      <if type="legal_case">
        <text variable="authority" prefix=". "/>
      </if>
      <else-if type="speech">
        <group prefix=". " delimiter=", ">
          <group delimiter=" ">
            <text variable="genre" text-case="capitalize-first"/>
            <text macro="event"/>
          </group>
          <text variable="event-place"/>
          <text macro="day-month"/>
        </group>
      </else-if>
      <else-if type="article-newspaper article-magazine personal_communication" match="any">
        <date variable="issued" form="text" prefix=", "/>
      </else-if>
      <else-if type="patent">
        <group delimiter=", " prefix=", ">
          <group delimiter=" ">
            <!--Needs Localization-->
            <text value="filed"/>
            <date variable="submitted" form="text"/>
          </group>
          <group delimiter=" ">
            <choose>
              <if variable="issued submitted" match="all">
                <text term="and"/>
              </if>
            </choose>
            <!--Needs Localization-->
            <text value="issued"/>
            <date variable="issued" form="text"/>
          </group>
        </group>
      </else-if>
      <else-if type="article-journal" match="any"/>
      <else>
        <group prefix=". " delimiter=", ">
          <choose>
            <if type="thesis">
              <text variable="genre" text-case="capitalize-first"/>
            </if>
          </choose>
          <text macro="publisher"/>
        </group>
      </else>
    </choose>
  </macro>
  <citation et-al-min="4" et-al-use-first="1" disambiguate-add-year-suffix="true" disambiguate-add-names="true" disambiguate-add-givenname="true" givenname-disambiguation-rule="primary-name" collapse="year" after-collapse-delimiter="; ">
    <layout prefix="(" suffix=")" delimiter="; ">
      <group delimiter=", ">
        <choose>
          <if variable="issued" match="any">
            <group delimiter=" ">
              <text macro="contributors-short"/>
              <text macro="date-in-text"/>
            </group>
          </if>
          <!---comma before forthcoming and n.d.-->
          <else>
            <group delimiter=", ">
              <text macro="contributors-short"/>
              <text macro="date-in-text"/>
            </group>
          </else>
        </choose>
        <text macro="point-locators"/>
      </group>
    </layout>
  </citation>
  <bibliography hanging-indent="true" et-al-min="11" et-al-use-first="7" subsequent-author-substitute="&#8212;&#8212;&#8212;" entry-spacing="0">
    <sort>
      <key macro="contributors"/>
      <key macro="date-sort"/>
      <key variable="title"/>
    </sort>
    <layout suffix=".">
      <group delimiter=". ">
        <text macro="contributors"/>
        <text macro="date"/>
        <text macro="title"/>
      </group>
      <text macro="description"/>
      <text macro="secondary-contributors" prefix=". "/>
      <text macro="container-title" prefix=". "/>
      <text macro="container-contributors"/>
      <text macro="edition"/>
      <text macro="locators-chapter"/>
      <text macro="collection-title-journal" prefix=", " suffix=", "/>
      <text macro="locators"/>
      <text macro="collection-title" prefix=". "/>
      <text macro="issue"/>
      <text macro="locators-article"/>
      <text macro="access" prefix=". "/>
    </layout>
  </bibliography>
</style>
`;

export const ChicagoStyleBibliography: Story = {
	args: {
		bibliographies,
		csls: [{ name: 'chicago-author-date', template: chicagoStyleCsl }],
		template: 'chicago-author-date'
	}
};
