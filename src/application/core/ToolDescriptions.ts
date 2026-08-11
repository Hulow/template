import { ToolName } from "./ToolNames.ts";

export const ToolDescriptions: Record<ToolName, string> = {
    read_file:
        "Read the contents of a file in the project workspace.",
    
    write_file:
        "Write content to a file in the project workspace.",
    
    delete_file:
        "Delete a file from the project workspace.",
    
    list_files:
        "List files and directories in the project workspace.",
    
    move_file:
        "Move a file or directory to another location.",
    
    copy_file:
        "Copy a file or directory to another location.",
    
    search_files:
        "Search for files matching a pattern in the project workspace.",
    
    run_command:
        "Execute a shell command in the project workspace.",
    
    run_tests:
        "Run the project's test suite.",
    
    install_dependency:
        "Install a dependency for the project.",
    
    build_project:
        "Build the project.",
    
    git_status:
        "Show the current Git working tree status.",
    
    git_diff:
        "Show changes in the Git working tree.",
    
    git_commit:
        "Create a Git commit with the specified changes.",
    
    git_log:
        "Show the Git commit history.",
    
    create_branch:
        "Create a new Git branch.",
    
    search_web:
        "Search the web for information.",
    
    fetch_url:
        "Fetch the contents of a URL.",
    
    search_code:
        "Search source code for a pattern or text.",
    
    find_symbol:
        "Find a symbol such as a class, function, or variable in the codebase.",
    
    analyze_code:
        "Analyze source code to identify issues or understand its behavior.",
    
    format_code:
        "Format source code according to the project's formatting rules.",
    };