<!-- src/routes/courses/+page.svelte -->
<script>
    export let data; // Data from the load function
    // Recursively flatten JSON-rich text to plain text
    function extractText(node) {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node && typeof node === 'object') {
            if (node.text) return node.text;
            const childField = node.children ?? node.content;
            return extractText(childField);
        }
        return '';
    }
</script>
{#each data.courses as course (course.id)}
    <li class="course-item">
        <h2><a href="/courses/{course.slug}">{course.title}</a></h2>

        {#if course.htmlContent}
            {@html course.htmlContent}
        {:else if course.content}
            <pre>{extractText(course.content)}</pre>
        {:else}
            <p>No content available for this course.</p>
        {/if}
    </li>
{/each}