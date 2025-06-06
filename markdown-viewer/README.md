Data Flow Explained

    Strapi (CMS):

        You create "Course" entries with fields like title, slug, summary, and content (Markdown).

        Strapi stores this in its database.

        It exposes REST API endpoints (e.g., /api/courses, /api/courses?filters[slug][$eq]=...).

        Permissions are set to allow public read access (find, findOne).

    SvelteKit (Frontend - markdown-viewer):

        User Request: A user navigates to /courses or /courses/some-slug.

        SvelteKit Routing: SvelteKit matches the URL to the appropriate src/routes/.../+page.server.js.

        load Function Execution (Server-Side or Build-Time):

            The load function in +page.server.js executes.

            It uses SvelteKit's fetch to make an HTTP GET request to your Strapi API URL (e.g., http://localhost:1337/api/courses?...), which is read from environment variables.

            Strapi responds with JSON data for the requested course(s).

            The load function parses this JSON.

            For individual course pages, it takes the content (Markdown string) from the Strapi response.

            It then calls mdsvex.compile(markdownString) (or marked(markdownString)). This function converts the Markdown string into an HTML string.

            The load function returns an object containing the fetched and processed data (e.g., { courses: [...] } or { course: { ..., htmlContent: '...' } }).

        Svelte Component Rendering:

            SvelteKit takes the data returned by the load function and passes it as a data prop to the corresponding +page.svelte component.

            The Svelte component uses this data prop to render the page.

            For Markdown content, it uses {@html data.course.htmlContent} to inject the pre-rendered HTML string into the DOM.

        Response to User:

            If Server-Side Rendering (SSR) is active (default with adapter-auto or adapter-node), SvelteKit sends the fully rendered HTML page to the user's browser.

            If Static Site Generation (SSG) is used (with adapter-static and pre-rendering enabled), the HTML pages are generated at build time. The web server then serves these static HTML files.

This setup ensures that data fetching and Markdown processing happen server-side (or at build-time for SSG), which is excellent for SEO and initial page load performance. The browser receives HTML ready to be displayed.
