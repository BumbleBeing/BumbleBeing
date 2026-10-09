import { error } from '@sveltejs/kit';
import { projectBySlug, projects } from '$lib/content';

/**
 * Only Projects that ship a playable build get this child page. Without the
 * filter the prerenderer would try `/play` under every slug and 404 the build.
 */
export function entries() {
	return projects.filter((project) => project.play).map((project) => ({ slug: project.slug }));
}

export function load({ params }) {
	const project = projectBySlug(params.slug);
	if (!project) error(404, `No project called "${params.slug}"`);
	if (!project.play) error(404, `${project.title} has no playable build`);
	return { project, play: project.play };
}
