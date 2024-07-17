<script lang="ts">
	import type { WikidataEntry } from '$lib/types.js';

	export let citations: WikidataEntry[];

	export let activeTab = 1;
</script>

<div role="tablist" class="tabs tabs-lifted">
	<input
		type="radio"
		name="wikidata_citations"
		role="tab"
		class="tab"
		aria-label="Citing"
		checked={activeTab === 1}
	/>
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		<ul>
			{#each citations as citation}
				<li id={citation.id} class="border-base-300">
					{citation.author}. {new Date(citation.pubdate).getFullYear()}.
					<span class="italic">{citation.title}</span>.
					{#if citation.citing.length > 0}
						<div class="ml-8">
							<h3 class="prose prose-h3 font-bold">Citing:</h3>
							<ul class="list-hyphen">
								{#each citation.citing as citing}
									<li>
										{citing.author}. {new Date(citing.pubdate).getFullYear()}.
										<span class="italic">{citing.title}</span>.
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<input
		type="radio"
		name="wikidata_citations"
		role="tab"
		class="tab"
		aria-label="Cited by"
		checked={activeTab === 2}
	/>
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		<ul>
			{#each citations as citation}
				<li id={citation.id} class="border-base-300">
					{citation.author}. {new Date(citation.pubdate).getFullYear()}.
					<span class="italic">{citation.title}</span>.
					{#if citation.citedBy.length > 0}
						<div class="ml-8">
							<h3 class="prose prose-h3 font-bold">Cited by:</h3>
							<ul class="list-hyphen">
								{#each citation.citedBy as citedBy}
									<li>
										{citedBy.author}. {new Date(citedBy.pubdate).getFullYear()}.
										<span class="italic">{citedBy.title}</span>.
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	.list-hyphen {
		list-style-type: '- ';
	}
</style>
