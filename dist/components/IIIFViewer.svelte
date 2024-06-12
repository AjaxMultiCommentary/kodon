<script>import { onMount } from "svelte";
export let url;
export let comment;
let iiifElement;
let viewer;
onMount(() => {
  updateViewer();
});
function tiles(comment2) {
  if (!comment2.image_paths)
    return [];
  return [...new Set(JSON.parse(comment2.image_paths))].map((p) => ({
    type: "image",
    url: `${url.endsWith("/") ? url : url + "/"}${p}`,
    crossOriginPolicy: "Anonymous",
    ajaxWithCredentials: false,
    imagePath: p
  }));
}
async function updateViewer() {
  const { default: OpenSeadragon } = await import("openseadragon");
  const tileSources = tiles(comment).map((tile) => {
    const overlays = JSON.parse(comment.overlays || "[]").filter((overlay) => tile.url.indexOf(overlay.page_id) > -1).map((overlay) => ({
      ...overlay,
      className: "bg-sky-400 opacity-50"
    }));
    tile.overlays = overlays;
    return tile;
  });
  viewer = OpenSeadragon({
    element: iiifElement,
    maxZoomLevel: 4,
    prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
    preserveViewport: true,
    sequenceMode: true,
    // @ts-expect-error
    tileSources
  });
  viewer.addOnceHandler("add-overlay", ({ eventSource }) => {
    window.requestAnimationFrame(() => {
      let overlay = eventSource.currentOverlays.at(1);
      if (overlay == void 0) {
        overlay = eventSource.currentOverlays[0];
      }
      const viewport = eventSource.viewport;
      viewport.fitBoundsWithConstraints(overlay.getBounds(viewport));
    });
  });
}
</script>

<div
	bind:this={iiifElement}
	id={`iiif_comment_viewer-${comment.citable_urn}`}
	class="openseadragon-iiif-viewer"
/>

<style>
	/* OpenSeadragon requires that its
	 * viewer have width and height set.
	 */
	.openseadragon-iiif-viewer {
		height: 300px;
		width: 290px;
		max-width: 100%;
	}
</style>
