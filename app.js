// Application data
const mockData = {
  "mockAnalysisTemplates": {
    "functional_requirements": [
      "User authentication and authorization system",
      "Data input validation and processing",
      "File upload and management capabilities",
      "Report generation and export functionality",
      "Search and filtering capabilities",
      "CRUD operations for data management",
      "Integration with external APIs",
      "Notification and alert system"
    ],
    "non_functional_requirements": [
      "Performance: Response time under 2 seconds",
      "Scalability: Support for 1000+ concurrent users",
      "Security: Data encryption and secure transmission",
      "Usability: Intuitive user interface design",
      "Reliability: 99.9% uptime availability",
      "Compatibility: Cross-browser support",
      "Maintainability: Modular and documented code",
      "Accessibility: WCAG 2.1 compliance"
    ],
    "technical_specifications": [
      "Frontend: React.js with TypeScript",
      "Backend: Node.js with Express framework",
      "Database: PostgreSQL with Redis caching",
      "Authentication: JWT with OAuth 2.0",
      "Hosting: Cloud-based deployment (AWS/Azure)",
      "API: RESTful services with GraphQL",
      "Testing: Unit and integration testing suite",
      "Monitoring: Application performance monitoring"
    ]
  },
  "codeTemplates": {
    "Python": "# Generated Python Code\ndef main():\n    \"\"\"\n    Main function implementing the requested functionality\n    \"\"\"\n    print('Hello, World!')\n    return True\n\nif __name__ == '__main__':\n    main()",
    "JavaScript": "// Generated JavaScript Code\nfunction main() {\n    /**\n     * Main function implementing the requested functionality\n     */\n    console.log('Hello, World!');\n    return true;\n}\n\n// Execute main function\nmain();",
    "Java": "// Generated Java Code\npublic class Main {\n    /**\n     * Main method implementing the requested functionality\n     */\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
    "C++": "// Generated C++ Code\n#include <iostream>\nusing namespace std;\n\n/**\n * Main function implementing the requested functionality\n */\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}",
    "C#": "// Generated C# Code\nusing System;\n\nnamespace GeneratedCode\n{\n    class Program\n    {\n        /// <summary>\n        /// Main method implementing the requested functionality\n        /// </summary>\n        static void Main(string[] args)\n        {\n            Console.WriteLine(\"Hello, World!\");\n        }\n    }\n}",
    "PHP": "<?php\n// Generated PHP Code\n\n/**\n * Main function implementing the requested functionality\n */\nfunction main() {\n    echo \"Hello, World!\";\n    return true;\n}\n\n// Execute main function\nmain();\n?>",
    "Go": "// Generated Go Code\npackage main\n\nimport \"fmt\"\n\n// main function implementing the requested functionality\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
    "Rust": "// Generated Rust Code\n\n/// Main function implementing the requested functionality\nfn main() {\n    println!(\"Hello, World!\");\n}"
  }
};

// DOM elements
let currentTab = 'analysis';
let uploadedFile = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing application...');
    initializeApp();
    loadUserPreferences();
});

function initializeApp() {
    setupTabNavigation();
    setupFileUpload();
    setupAnalysisForm();
    setupCodeGeneration();
    setupCopyButton();
    console.log('Application initialized successfully');
}

// Tab Navigation - Fixed implementation
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    console.log('Setting up tab navigation...', tabBtns.length, 'tabs found');

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Remove active class from all tabs
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        console.log('Removed active from tab button:', btn.getAttribute('data-tab'));
    });
    
    tabContents.forEach(content => {
        content.classList.remove('active');
        console.log('Removed active from tab content:', content.id);
    });

    // Add active class to selected tab
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(`${tabName}-tab`);
    
    if (targetButton && targetContent) {
        targetButton.classList.add('active');
        targetContent.classList.add('active');
        currentTab = tabName;
        saveUserPreferences();
        console.log('Successfully switched to tab:', tabName);
    } else {
        console.error('Tab not found:', tabName, 'Button:', targetButton, 'Content:', targetContent);
    }
}

// File Upload - Enhanced with better feedback
function setupFileUpload() {
    const uploadArea = document.getElementById('pdf-upload-area');
    const fileInput = document.getElementById('pdf-file-input');
    const uploadedFileDiv = document.getElementById('uploaded-file');
    const removeFileBtn = document.getElementById('remove-file');

    if (!uploadArea || !fileInput) {
        console.error('File upload elements not found');
        return;
    }

    uploadArea.addEventListener('click', () => {
        console.log('Upload area clicked');
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
        console.log('Drag over detected');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        // Only remove dragover if we're actually leaving the upload area
        if (!uploadArea.contains(e.relatedTarget)) {
            uploadArea.classList.remove('dragover');
            console.log('Drag leave detected');
        }
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        console.log('Files dropped:', files.length);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        console.log('File input changed');
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', () => {
            removeUploadedFile();
        });
    }
}

function handleFileUpload(file) {
    console.log('Handling file upload:', file.name, file.type, file.size);
    
    if (file.type !== 'application/pdf') {
        showToast('Please upload a valid PDF file', 'error');
        return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showToast('File size must be less than 10MB', 'error');
        return;
    }

    uploadedFile = file;
    displayUploadedFile(file.name);
    showToast('PDF file uploaded successfully', 'success');
}

function displayUploadedFile(fileName) {
    const uploadArea = document.getElementById('pdf-upload-area');
    const uploadedFileDiv = document.getElementById('uploaded-file');
    const fileNameSpan = uploadedFileDiv.querySelector('.file-name');

    if (uploadArea && uploadedFileDiv && fileNameSpan) {
        uploadArea.style.display = 'none';
        uploadedFileDiv.style.display = 'flex';
        fileNameSpan.textContent = fileName;
    }
}

function removeUploadedFile() {
    const uploadArea = document.getElementById('pdf-upload-area');
    const uploadedFileDiv = document.getElementById('uploaded-file');
    const fileInput = document.getElementById('pdf-file-input');

    uploadedFile = null;
    if (fileInput) fileInput.value = '';
    if (uploadArea) uploadArea.style.display = 'block';
    if (uploadedFileDiv) uploadedFileDiv.style.display = 'none';
    showToast('File removed', 'info');
}

// PDF Processing
async function extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            try {
                const typedArray = new Uint8Array(this.result);
                
                pdfjsLib.getDocument(typedArray).promise.then(function(pdf) {
                    const textPromises = [];
                    
                    for (let i = 1; i <= pdf.numPages; i++) {
                        textPromises.push(
                            pdf.getPage(i).then(function(page) {
                                return page.getTextContent().then(function(textContent) {
                                    return textContent.items.map(item => item.str).join(' ');
                                });
                            })
                        );
                    }
                    
                    Promise.all(textPromises).then(function(pages) {
                        const fullText = pages.join('\n\n');
                        resolve(fullText);
                    }).catch(reject);
                }).catch(reject);
            } catch (error) {
                reject(error);
            }
        };
        
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(file);
    });
}

// Analysis Form - Fixed implementation
function setupAnalysisForm() {
    const analyzeBtn = document.getElementById('analyze-btn');
    
    if (!analyzeBtn) {
        console.error('Analyze button not found');
        return;
    }
    
    analyzeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Analyze button clicked');
        await performAnalysis();
    });
}

async function performAnalysis() {
    console.log('Starting analysis...');
    
    const requirementsInput = document.getElementById('requirements-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const analysisOutput = document.getElementById('analysis-output');

    if (!requirementsInput || !analyzeBtn || !analysisOutput) {
        console.error('Required elements not found for analysis');
        return;
    }

    let content = requirementsInput.value.trim();
    console.log('Content length:', content.length);

    // Check if we have PDF or text input
    if (uploadedFile) {
        try {
            setButtonLoading(analyzeBtn, true);
            showToast('Processing PDF file...', 'info');
            content = await extractTextFromPDF(uploadedFile);
            console.log('PDF content extracted, length:', content.length);
        } catch (error) {
            console.error('PDF processing error:', error);
            showToast('Error reading PDF file: ' + error.message, 'error');
            setButtonLoading(analyzeBtn, false);
            return;
        }
    }

    if (!content && !uploadedFile) {
        showToast('Please upload a PDF or enter requirements text', 'error');
        return;
    }

    console.log('Setting loading state...');
    setButtonLoading(analyzeBtn, true);
    
    // Simulate AI processing delay - Fixed timeout
    setTimeout(() => {
        try {
            console.log('Generating analysis...');
            const analysis = generateMockAnalysis(content);
            console.log('Analysis generated:', analysis);
            displayAnalysis(analysis);
            setButtonLoading(analyzeBtn, false);
            showToast('Analysis completed successfully', 'success');
        } catch (error) {
            console.error('Analysis error:', error);
            setButtonLoading(analyzeBtn, false);
            showToast('Error during analysis', 'error');
        }
    }, 2000); // Fixed 2 second delay
}

function generateMockAnalysis(content) {
    console.log('Generating mock analysis for content...');
    
    const analysis = {
        functional: [],
        nonFunctional: [],
        technical: []
    };

    // Simple keyword matching to make responses more relevant
    const keywords = content.toLowerCase();
    console.log('Keywords found:', keywords.slice(0, 100) + '...');
    
    // Add functional requirements based on content keywords
    if (keywords.includes('user') || keywords.includes('login') || keywords.includes('auth')) {
        analysis.functional.push('User authentication and authorization system');
    }
    if (keywords.includes('upload') || keywords.includes('file')) {
        analysis.functional.push('File upload and management capabilities');
    }
    if (keywords.includes('search') || keywords.includes('filter')) {
        analysis.functional.push('Search and filtering capabilities');
    }
    if (keywords.includes('report') || keywords.includes('export')) {
        analysis.functional.push('Report generation and export functionality');
    }
    if (keywords.includes('notification') || keywords.includes('alert')) {
        analysis.functional.push('Notification and alert system');
    }
    
    // Add random selections if no specific matches or fill remaining slots
    const remainingFunctional = mockData.mockAnalysisTemplates.functional_requirements.filter(
        req => !analysis.functional.includes(req)
    );
    const neededFunctional = Math.max(0, 4 - analysis.functional.length);
    const additionalFunctional = getRandomItems(remainingFunctional, neededFunctional);
    analysis.functional.push(...additionalFunctional);

    // Add non-functional requirements
    if (keywords.includes('performance') || keywords.includes('fast')) {
        analysis.nonFunctional.push('Performance: Response time under 2 seconds');
    }
    if (keywords.includes('security') || keywords.includes('secure')) {
        analysis.nonFunctional.push('Security: Data encryption and secure transmission');
    }
    if (keywords.includes('scale') || keywords.includes('user')) {
        analysis.nonFunctional.push('Scalability: Support for 1000+ concurrent users');
    }
    
    const remainingNonFunctional = mockData.mockAnalysisTemplates.non_functional_requirements.filter(
        req => !analysis.nonFunctional.includes(req)
    );
    const neededNonFunctional = Math.max(0, 4 - analysis.nonFunctional.length);
    const additionalNonFunctional = getRandomItems(remainingNonFunctional, neededNonFunctional);
    analysis.nonFunctional.push(...additionalNonFunctional);

    // Add technical specifications
    if (keywords.includes('web') || keywords.includes('frontend')) {
        analysis.technical.push('Frontend: React.js with TypeScript');
    }
    if (keywords.includes('api') || keywords.includes('backend')) {
        analysis.technical.push('Backend: Node.js with Express framework');
    }
    if (keywords.includes('database') || keywords.includes('data')) {
        analysis.technical.push('Database: PostgreSQL with Redis caching');
    }
    
    const remainingTechnical = mockData.mockAnalysisTemplates.technical_specifications.filter(
        req => !analysis.technical.includes(req)
    );
    const neededTechnical = Math.max(0, 4 - analysis.technical.length);
    const additionalTechnical = getRandomItems(remainingTechnical, neededTechnical);
    analysis.technical.push(...additionalTechnical);

    console.log('Generated analysis:', analysis);
    return analysis;
}

function displayAnalysis(analysis) {
    const analysisOutput = document.getElementById('analysis-output');
    
    if (!analysisOutput) {
        console.error('Analysis output element not found');
        return;
    }
    
    const html = `
        <div class="requirements-section">
            <h4>Functional Requirements</h4>
            <ul class="requirements-list">
                ${analysis.functional.map(req => `<li>${escapeHtml(req)}</li>`).join('')}
            </ul>
        </div>
        
        <div class="requirements-section">
            <h4>Non-Functional Requirements</h4>
            <ul class="requirements-list">
                ${analysis.nonFunctional.map(req => `<li>${escapeHtml(req)}</li>`).join('')}
            </ul>
        </div>
        
        <div class="requirements-section">
            <h4>Technical Specifications</h4>
            <ul class="requirements-list">
                ${analysis.technical.map(req => `<li>${escapeHtml(req)}</li>`).join('')}
            </ul>
        </div>
    `;
    
    analysisOutput.innerHTML = html;
    console.log('Analysis displayed successfully');
}

// Code Generation - Fixed implementation
function setupCodeGeneration() {
    const generateBtn = document.getElementById('generate-btn');
    
    if (!generateBtn) {
        console.error('Generate button not found');
        return;
    }
    
    generateBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Generate button clicked');
        await performCodeGeneration();
    });
}

async function performCodeGeneration() {
    console.log('Starting code generation...');
    
    const codeRequirementsInput = document.getElementById('code-requirements-input');
    const languageSelect = document.getElementById('language-select');
    const generateBtn = document.getElementById('generate-btn');
    const codeOutput = document.getElementById('code-output');
    const copyBtn = document.getElementById('copy-code-btn');

    if (!codeRequirementsInput || !languageSelect || !generateBtn || !codeOutput) {
        console.error('Required elements not found for code generation');
        return;
    }

    const requirements = codeRequirementsInput.value.trim();
    const language = languageSelect.value;

    console.log('Requirements:', requirements);
    console.log('Language:', language);

    if (!requirements) {
        showToast('Please enter code requirements', 'error');
        return;
    }

    setButtonLoading(generateBtn, true);
    
    // Simulate AI processing delay
    setTimeout(() => {
        try {
            console.log('Generating code...');
            const generatedCode = generateMockCode(requirements, language);
            console.log('Code generated successfully');
            displayGeneratedCode(generatedCode, language);
            setButtonLoading(generateBtn, false);
            if (copyBtn) copyBtn.style.display = 'block';
            showToast('Code generated successfully', 'success');
        } catch (error) {
            console.error('Code generation error:', error);
            setButtonLoading(generateBtn, false);
            showToast('Error during code generation', 'error');
        }
    }, 1500);
}

function generateMockCode(requirements, language) {
    console.log('Generating mock code for:', requirements, 'in', language);
    
    let baseCode = mockData.codeTemplates[language];
    
    // Customize code based on requirements
    const reqLower = requirements.toLowerCase();
    
    if (reqLower.includes('calculator') || reqLower.includes('math')) {
        baseCode = getCalculatorCode(language);
    } else if (reqLower.includes('hello') || reqLower.includes('greeting')) {
        baseCode = getGreetingCode(language);
    } else if (reqLower.includes('api') || reqLower.includes('server')) {
        baseCode = getApiCode(language);
    } else if (reqLower.includes('file') || reqLower.includes('read')) {
        baseCode = getFileCode(language);
    } else {
        // Customize the basic template with requirements
        const shortReq = requirements.slice(0, 50) + (requirements.length > 50 ? '...' : '');
        baseCode = baseCode.replace('Hello, World!', `Generated code for: ${shortReq}`);
    }
    
    return baseCode;
}

function getCalculatorCode(language) {
    const calculatorCodes = {
        'Python': `# Calculator Application\ndef add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b != 0:\n        return a / b\n    else:\n        return "Error: Division by zero"\n\n# Example usage\nresult = add(10, 5)\nprint(f"10 + 5 = {result}")`,
        'JavaScript': `// Calculator Application\nclass Calculator {\n    add(a, b) {\n        return a + b;\n    }\n    \n    subtract(a, b) {\n        return a - b;\n    }\n    \n    multiply(a, b) {\n        return a * b;\n    }\n    \n    divide(a, b) {\n        return b !== 0 ? a / b : "Error: Division by zero";\n    }\n}\n\n// Example usage\nconst calc = new Calculator();\nconsole.log("10 + 5 =", calc.add(10, 5));`,
        'Java': `// Calculator Application\npublic class Calculator {\n    public double add(double a, double b) {\n        return a + b;\n    }\n    \n    public double subtract(double a, double b) {\n        return a - b;\n    }\n    \n    public double multiply(double a, double b) {\n        return a * b;\n    }\n    \n    public double divide(double a, double b) {\n        if (b != 0) {\n            return a / b;\n        } else {\n            throw new ArithmeticException("Division by zero");\n        }\n    }\n    \n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        System.out.println("10 + 5 = " + calc.add(10, 5));\n    }\n}`
    };
    
    return calculatorCodes[language] || mockData.codeTemplates[language];
}

function getGreetingCode(language) {
    const greetingCodes = {
        'Python': `# Greeting Application\ndef greet(name):\n    return f"Hello, {name}! Welcome to our application."\n\ndef main():\n    user_name = input("Enter your name: ")\n    greeting = greet(user_name)\n    print(greeting)\n\nif __name__ == "__main__":\n    main()`,
        'JavaScript': `// Greeting Application\nfunction greet(name) {\n    return \`Hello, \${name}! Welcome to our application.\`;\n}\n\nfunction main() {\n    const userName = prompt("Enter your name:");\n    const greeting = greet(userName);\n    console.log(greeting);\n}\n\n// Execute main function\nmain();`,
        'Java': `// Greeting Application\nimport java.util.Scanner;\n\npublic class GreetingApp {\n    public static String greet(String name) {\n        return "Hello, " + name + "! Welcome to our application.";\n    }\n    \n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Enter your name: ");\n        String name = scanner.nextLine();\n        String greeting = greet(name);\n        System.out.println(greeting);\n        scanner.close();\n    }\n}`
    };
    
    return greetingCodes[language] || mockData.codeTemplates[language];
}

function getApiCode(language) {
    const apiCodes = {
        'Python': `# Simple API Server\nfrom flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route('/api/health', methods=['GET'])\ndef health_check():\n    return jsonify({"status": "healthy", "message": "API is running"})\n\n@app.route('/api/users', methods=['GET'])\ndef get_users():\n    users = [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]\n    return jsonify(users)\n\nif __name__ == '__main__':\n    app.run(debug=True, port=5000)`,
        'JavaScript': `// Simple API Server (Node.js + Express)\nconst express = require('express');\nconst app = express();\nconst PORT = 3000;\n\n// Middleware\napp.use(express.json());\n\n// Routes\napp.get('/api/health', (req, res) => {\n    res.json({ status: 'healthy', message: 'API is running' });\n});\n\napp.get('/api/users', (req, res) => {\n    const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];\n    res.json(users);\n});\n\n// Start server\napp.listen(PORT, () => {\n    console.log(\`Server running on port \${PORT}\`);\n});`,
        'Java': `// Simple API Server (Spring Boot)\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RestController;\nimport java.util.*;\n\n@SpringBootApplication\n@RestController\npublic class ApiServer {\n    \n    @GetMapping("/api/health")\n    public Map<String, String> healthCheck() {\n        Map<String, String> response = new HashMap<>();\n        response.put("status", "healthy");\n        response.put("message", "API is running");\n        return response;\n    }\n    \n    public static void main(String[] args) {\n        SpringApplication.run(ApiServer.class, args);\n    }\n}`
    };
    
    return apiCodes[language] || mockData.codeTemplates[language];
}

function getFileCode(language) {
    const fileCodes = {
        'Python': `# File Processing\nimport os\n\ndef read_file(filename):\n    try:\n        with open(filename, 'r') as file:\n            content = file.read()\n            return content\n    except FileNotFoundError:\n        return "Error: File not found"\n    except Exception as e:\n        return f"Error: {str(e)}"\n\ndef write_file(filename, content):\n    try:\n        with open(filename, 'w') as file:\n            file.write(content)\n            return "File written successfully"\n    except Exception as e:\n        return f"Error: {str(e)}"\n\n# Example usage\ndata = "Hello, World!"\nwrite_file("output.txt", data)\nprint(read_file("output.txt"))`,
        'JavaScript': `// File Processing (Node.js)\nconst fs = require('fs');\n\nfunction readFile(filename) {\n    try {\n        const content = fs.readFileSync(filename, 'utf8');\n        return content;\n    } catch (error) {\n        return \`Error: \${error.message}\`;\n    }\n}\n\nfunction writeFile(filename, content) {\n    try {\n        fs.writeFileSync(filename, content);\n        return "File written successfully";\n    } catch (error) {\n        return \`Error: \${error.message}\`;\n    }\n}\n\n// Example usage\nconst data = "Hello, World!";\nconsole.log(writeFile("output.txt", data));\nconsole.log(readFile("output.txt"));`,
        'Java': `// File Processing\nimport java.io.*;\nimport java.nio.file.*;\n\npublic class FileProcessor {\n    public static String readFile(String filename) {\n        try {\n            return new String(Files.readAllBytes(Paths.get(filename)));\n        } catch (IOException e) {\n            return "Error: " + e.getMessage();\n        }\n    }\n    \n    public static String writeFile(String filename, String content) {\n        try {\n            Files.write(Paths.get(filename), content.getBytes());\n            return "File written successfully";\n        } catch (IOException e) {\n            return "Error: " + e.getMessage();\n        }\n    }\n    \n    public static void main(String[] args) {\n        String data = "Hello, World!";\n        System.out.println(writeFile("output.txt", data));\n        System.out.println(readFile("output.txt"));\n    }\n}`
    };
    
    return fileCodes[language] || mockData.codeTemplates[language];
}

function displayGeneratedCode(code, language) {
    const codeOutput = document.getElementById('code-output');
    
    if (!codeOutput) {
        console.error('Code output element not found');
        return;
    }
    
    const html = `
        <div class="code-block">
            <div class="code-header">${escapeHtml(language)}</div>
            <div class="code-content">
                <pre><code class="language-${language.toLowerCase()}">${escapeHtml(code)}</code></pre>
            </div>
        </div>
    `;
    
    codeOutput.innerHTML = html;
    
    // Trigger syntax highlighting if Prism is available
    if (window.Prism) {
        Prism.highlightAll();
    }
    
    console.log('Code displayed successfully');
}

// Copy functionality
function setupCopyButton() {
    const copyBtn = document.getElementById('copy-code-btn');
    
    if (!copyBtn) {
        console.error('Copy button not found');
        return;
    }
    
    copyBtn.addEventListener('click', () => {
        const codeElement = document.querySelector('#code-output pre code');
        if (codeElement) {
            const code = codeElement.textContent;
            copyToClipboard(code);
        }
    });
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Code copied to clipboard', 'success');
    } catch (err) {
        console.log('Falling back to legacy copy method');
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Code copied to clipboard', 'success');
    }
}

// Utility functions
function setButtonLoading(button, loading) {
    if (!button) {
        console.error('Button not found for loading state');
        return;
    }
    
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.loading-spinner');
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        console.log('Button set to loading state');
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        console.log('Button loading state removed');
    }
}

function showToast(message, type = 'info') {
    console.log('Showing toast:', message, type);
    
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.error('Toast container not found');
        return;
    }
    
    const toast = document.createElement('div');
    
    const icons = {
        success: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
        error: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
        info: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    };
    
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        ${icons[type]}
        <span class="toast-message">${escapeHtml(message)}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4000);
}

function getRandomItems(array, count) {
    if (!Array.isArray(array) || count <= 0) return [];
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
}

function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Local storage functions
function saveUserPreferences() {
    try {
        const languageSelect = document.getElementById('language-select');
        const preferences = {
            currentTab: currentTab,
            language: languageSelect ? languageSelect.value : 'Python'
        };
        localStorage.setItem('aiCodeGenPrefs', JSON.stringify(preferences));
        console.log('Preferences saved:', preferences);
    } catch (e) {
        console.log('Could not save preferences:', e);
    }
}

function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('aiCodeGenPrefs');
        if (saved) {
            const preferences = JSON.parse(saved);
            console.log('Loading preferences:', preferences);
            
            if (preferences.currentTab && preferences.currentTab !== 'analysis') {
                switchTab(preferences.currentTab);
            }
            if (preferences.language) {
                const languageSelect = document.getElementById('language-select');
                if (languageSelect) {
                    languageSelect.value = preferences.language;
                }
            }
        }
    } catch (e) {
        console.log('Could not load preferences:', e);
    }
}

// Save preferences on form changes
document.addEventListener('change', (e) => {
    if (e.target.id === 'language-select') {
        saveUserPreferences();
    }
});