<!-- src/routes/+page.svelte -->
<script>
    import { base } from '$app/paths';
    console.log(base)
</script>

<svelte:head>
    <title>Welcome to Markdown Viewer</title>
    <meta name="description" content="Browse our amazing courses built with SvelteKit and Strapi" />
</svelte:head>

<div class="container">
    <h1>Welcome to Your Course Platform!</h1>
    <p>
        This is the homepage of your application.
    </p>
    <p>
        You can browse all available courses by visiting the link below:
    </p>
    <p>
        <a href="{base}/courses" class="button">View All Courses</a>
    </p>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 4rem auto;
        padding: 2rem;
        text-align: center;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    h1 {
        color: #333;
        margin-bottom: 1.5rem;
    }

    p {
        color: #555;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .button {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        margin-top: 1rem;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.2s ease-in-out;
    }

    .button:hover {
        background-color: #0056b3;
    }
</style>