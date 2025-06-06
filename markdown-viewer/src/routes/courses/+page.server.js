// src/routes/courses/+page.server.js
import { PUBLIC_STRAPI_URL } from '$env/static/public';

export async function load({ fetch }) {
    try {
        const baseApiUrl = PUBLIC_STRAPI_URL || 'https://miraculous-dream-206dbd0e97.strapiapp.com';
        const coursesApiPath = '/api/courses';
        const queryParams = '?fields[0]=title&fields[1]=slug&fields[2]=summary&fields[3]=content&sort=title:asc';

        const apiUrl = `${baseApiUrl}${coursesApiPath}${queryParams}`;

        console.log("SVELTEKIT: Attempting to fetch courses from:", apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('SVELTEKIT: Strapi response status:', response.status, 'StatusText:', response.statusText);
            console.error('SVELTEKIT: Strapi error response text:', errorText);
            throw new Error(`Failed to fetch courses. Status: ${response.status}. Message: ${errorText.substring(0, 200)}`);
        }

        const responseData = await response.json(); // This is the top-level response
        console.log("SVELTEKIT: Received responseData:", JSON.stringify(responseData, null, 2));

        // *** ADAPTATION BASED ON YOUR OBSERVED RESPONSE ***
        let courseItems = [];
        if (responseData && Array.isArray(responseData.data)) { // If responseData = { data: [...], meta: ... }
            courseItems = responseData.data;
        } else if (Array.isArray(responseData)) { // If responseData = [...] directly
            courseItems = responseData;
        } else {
            console.error("SVELTEKIT: Unexpected API response structure. 'data' array not found or response is not an array. Received:", responseData);
            return { courses: [], error: "Unexpected API response structure." };
        }

        if (courseItems.length === 0) {
            console.log("SVELTEKIT: No courses found in the API response.");
            return { courses: [] }; // No courses to map
        }

        const courses = courseItems.map(item => {
            // Check if item itself is valid
            if (!item || typeof item.id === 'undefined') { // Check for a basic field like id
                console.warn("SVELTEKIT: Skipping an invalid item:", item);
                return null;
            }
            // Access fields directly from the item, NO 'attributes'
            return {
                id: item.id,
                title: item.title,
                slug: item.slug,
                summary: item.summary,
                content: item.content, // This will be the JSON Rich Text structure
                // documentId: item.documentId // if you need this
            };
        }).filter(course => course !== null);

        console.log("SVELTEKIT: Processed courses:", courses);

        return {
            courses
        };

    } catch (error) {
        console.error("SVELTEKIT: Error in load function:", error);
        return {
            courses: [],
            error: `Could not fetch courses. ${error.message}`
        };
    }
}