<!-- src/+layout.svelte -->
<script>
    export let data; // Data from +layout.server.js (or +layout.js)
</script>

<div class="app-container">
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/courses">All Courses</a>
            {#if data.navCourses && data.navCourses.length > 0}
                <span>| Quick Nav:</span>
                {#each data.navCourses as course}
                    <a href="/courses/{course.slug}">{course.title}</a>
                {/each}
            {/if}
            {#if data.navError}
                <span style="color: red; margin-left: 10px;">{data.navError}</span>
            {/if}
        </nav>
    </header>

    <main>
        <!-- This <slot /> is where SvelteKit renders the content of your +page.svelte -->
        <slot />
    </main>

    <footer>
        <p>© {new Date().getFullYear()} Markdown Viewer Courses</p>
    </footer>
</div>

<style>
    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    header {
        background-color: #f0f0f0;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
    }

    nav a {
        margin-right: 1rem;
        text-decoration: none;
        color: #333;
    }

    nav a:hover {
        text-decoration: underline;
    }

    main {
        flex-grow: 1;
        padding: 1rem;
        max-width: 900px; /* Or your preferred max width */
        margin: 0 auto; /* Center content */
        width: 100%;
    }

    footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1rem;
        margin-top: auto;
    }

    /* Optional: Basic global styles - can also go in app.css imported here */
    :global(body) {
        margin: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
    }
    :global(h1, h2, h3) {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }
</style>
