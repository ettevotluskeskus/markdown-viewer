// src/routes/courses/+page.server.js
import { PUBLIC_STRAPI_URL } from '$env/static/public';

export async function load({ fetch }) {
    try {
        //const apiUrl = 'http://localhost:1337/api/courses';
        const apiUrl = 'https://miraculous-dream-206dbd0e97.strapiapp.com/api/courses';
        console.log("SVELTEKIT: Attempting to fetch courses from:", apiUrl); // <<< ADD THIS LINE

        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error('SVELTEKIT: Strapi response status:', response.status, 'StatusText:', response.statusText);
            const errorText = await response.text();
            console.error('SVELTEKIT: Strapi error response text:', errorText);
            throw new Error(`Failed to fetch courses. Status: ${response.status}`);
        }

        const strapiData = await response.json();
        // Access fields directly from the item, as shown in your Strapi output
        const courses = strapiData.data.map(item => {
            // Add a log inside the map to see each item
            console.log("SVELTEKIT: Mapping item:", JSON.stringify(item, null, 2));
            return {
                id: item.id,
                title: item.title,          // Corrected
                slug: item.slug,            // Corrected
                summary: item.summary,      // Corrected
                content: item.content,
            };
        });

        return {
            courses
        };
    } catch (error) {
        console.error("SVELTEKIT: Error loading courses:", error);
        return {
            status: 500, // Consider using SvelteKit's error helper here too
            error: "Could not fetch courses." // Pass the original error message for more detail
        };
    }
}