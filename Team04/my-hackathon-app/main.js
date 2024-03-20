import './styles.css'

// Code snippets for Repository 1
const codeSnippets = {
  outdated: `
  <style>
        pre {
            background-color: #F6F8FA;
            border: 1px solid #E1E4E8;
            border-radius: 6px;
            padding: 16px;
            overflow: auto;
            line-height: 1.45;
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 0.95em;
        }
        code {
            color: #;
        }
    </style>
    <pre><code class="outdated-code">
      function createGreeting(name, age) {
        var greeting = 'Hello, my name is ' + name + ' and I am ' + age + ' years old.';
        return greeting;
      }
    </code></pre>
  `,
  updated: `
    <pre><code class="updated-code">
      function createGreeting(name, age) {
        const greeting = \`Hello, my name is \${name} and I am \${age} years old.\`;
        return greeting;
      }
    </code></pre>
  `
};

// Setup your content
const repoContents = {
  'Repository 1': `
    <h2 class="font-bold text-3xl mb-4">Repository 1</h2>
    
    <h3 class="font-bold text-xl mb-2">Code Update:</h3>
    ${codeSnippets.outdated}
    <h3 class="font-bold text-xl mb-2">Updated Code:</h3>
    ${codeSnippets.updated}

    <p class="text-gray-700 text-base mb-4">
      What was changed:
    </p>
    <p>
      The code was refactored to use template literals instead of string concatenation with the + operator.
    </p>

    <p>
      Why it was changed:
    </p>
    <p>
      Template literals provide a more readable and concise syntax for creating strings. This change makes the code easier to read and maintain, especially when dealing with multiple variables within a string. It also eliminates the need to manage spaces and plus signs which reduces the potential for errors.
    </p>

    <p>
      Context for PR Review:
    </p>
    <p>
     The updated code block is part of an effort to modernize the codebase by adopting newer JavaScript features that improve readability and maintainability. The use of const also ensures that the greeting variable is not re-assigned, which is a best practice for variables that should not change.
    </p>

    <blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-600">
      Normalization is for developers. Denormalization is for consumers.
      - Barbara Streissand
    </blockquote>
  `,
  'Repository 2': `
    <h2 class="font-bold text-3xl mb-4">Repository 2</h2>
    <h3 class="font-bold text-xl mb-2">Code Update:</h3>
    ${codeSnippets.outdated}
    <h3 class="font-bold text-xl mb-2">Updated Code:</h3>
    ${codeSnippets.updated}

    <p class="text-gray-700 text-base mb-4">
      What was changed:
    </p>
    <p>
      The code was refactored to use template literals instead of string concatenation with the + operator.
    </p>

    <p>
      Why it was changed:
    </p>
    <p>
      Template literals provide a more readable and concise syntax for creating strings. This change makes the code easier to read and maintain, especially when dealing with multiple variables within a string. It also eliminates the need to manage spaces and plus signs which reduces the potential for errors.
    </p>

    <p>
      Context for PR Review:
    </p>
    <p>
     The updated code block is part of an effort to modernize the codebase by adopting newer JavaScript features that improve readability and maintainability. The use of const also ensures that the greeting variable is not re-assigned, which is a best practice for variables that should not change.
    </p>
    <blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-600">
      Code is like humor. When you have to explain it, it's bad.
      - Cory House
    </blockquote>
  `,
  'Repository 3': `
    <h2 class="font-bold text-3xl mb-4">Repository 3</h2>
    <h3 class="font-bold text-xl mb-2">Code Update:</h3>
    ${codeSnippets.outdated}
    <h3 class="font-bold text-xl mb-2">Updated Code:</h3>
    ${codeSnippets.updated}

    <p class="text-gray-700 text-base mb-4">
      What was changed:
    </p>
    <p>
      The code was refactored to use template literals instead of string concatenation with the + operator.
    </p>

    <p>
      Why it was changed:
    </p>
    <p>
      Template literals provide a more readable and concise syntax for creating strings. This change makes the code easier to read and maintain, especially when dealing with multiple variables within a string. It also eliminates the need to manage spaces and plus signs which reduces the potential for errors.
    </p>

    <p>
      Context for PR Review:
    </p>
    <p>
     The updated code block is part of an effort to modernize the codebase by adopting newer JavaScript features that improve readability and maintainability. The use of const also ensures that the greeting variable is not re-assigned, which is a best practice for variables that should not change.
    </p>
    <blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-600">
      Simplicity is the soul of efficiency.
      - Austin Freeman
    </blockquote>
  `
};

// Function to change the main content and highlight the active link
function loadRepoContent(repoName) {
  const mainContentDiv = document.querySelector('.main-content');
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  
  // Update main content
  mainContentDiv.innerHTML = repoContents[repoName] || '';
  
  // Highlight active link and remove highlight from others
  sidebarLinks.forEach(link => {
    if (link.textContent === repoName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Sidebar content with links
const sidebarContent = `
  <div class="text-gray-700 text-center px-4 py-2 m-2">
    <div class="font-bold text-xl mb-2">PR Guru - Team04</div>
    <ul class="list-reset">
      <li class="my-2"><a href="#" onclick="loadRepoContent('Repository 1')">Repository 1</a></li>
      <li class="my-2"><a href="#" onclick="loadRepoContent('Repository 2')">Repository 2</a></li>
      <li class="my-2"><a href="#" onclick="loadRepoContent('Repository 3')">Repository 3</a></li>
    </ul>
  </div>
`;

// Initial main content load for Repository 1
const initialContent = repoContents['Repository 1'];

document.querySelector('#app').innerHTML = `
  <div class="sidebar">
    ${sidebarContent}
  </div>
  <div class="main-content">
    ${initialContent}
  </div>
`;

window.loadRepoContent = loadRepoContent;

// Load initial content for Repository 1
loadRepoContent('Repository 1');
