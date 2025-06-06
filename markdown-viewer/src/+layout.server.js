// src/+layout.server.js
import { PUBLIC_STRAPI_URL } from '$env';

export async function load({ fetch }) {
    try {
        // Fetch only titles and slugs for navigation
        const response = await fetch(`${PUBLIC_STRAPI_URL}/api/courses?fields[0]=title&fields[1]=slug&sort=title:asc`);
        if (!response.ok) {
            console.error("Layout: Failed to fetch courses for nav");
            return { navCourses: [], navError: "Could not load course navigation." };
        }
        const strapiData = await response.json();
        const navCourses = strapiData.data.map(item => ({
            title: item.attributes.title,
            slug: item.attributes.slug,
        }));
        return {
            navCourses
        };
    } catch (error) {
        console.error("Layout Error loading courses for nav:", error);
        return {
            navCourses: [],
            navError: "An error occurred while loading course navigation."
        };
    }
}
