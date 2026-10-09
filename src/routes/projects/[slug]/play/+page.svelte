<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button, Seo } from '$lib/components';

	let { data } = $props();
	const project = $derived(data.project);
	const play = $derived(data.play);
</script>

<Seo
	title="Play {project.title}"
	description="Play {project.title} in your browser. {project.blurb}"
/>

<article class="flex flex-col gap-6">
	<header class="flex flex-col items-center gap-3 text-center">
		<h1 class="font-display text-3xl font-bold sm:text-4xl">{project.title}</h1>
	</header>

	<!--
		The export is a whole HTML document of its own, so it lives in static/ and
		arrives in a frame rather than being rebuilt as a route. Godot sizes its
		canvas to the frame, so the aspect ratio here is what the game gets.
	-->
	<iframe
		src={play}
		title="{project.title}, playable build"
		class="aspect-video w-full rounded-lg border border-border bg-black"
		allow="autoplay; fullscreen; gamepad"
	></iframe>

	<div class="flex flex-wrap items-center justify-center gap-3">
		<Button variant="outline" size="sm" href={play}>Open fullscreen</Button>
		<Button variant="outline" size="sm" href={resolve('/projects/[slug]', { slug: project.slug })}>
			Back to the writeup
		</Button>
	</div>
</article>
