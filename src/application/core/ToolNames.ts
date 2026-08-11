export const ToolNames = {
    // Filesystem
    READ_FILE: "read_file",
    WRITE_FILE: "write_file",
    DELETE_FILE: "delete_file",
    LIST_FILES: "list_files",
    MOVE_FILE: "move_file",
    COPY_FILE: "copy_file",
    SEARCH_FILES: "search_files",
  
    // Shell / execution
    RUN_COMMAND: "run_command",
    RUN_TESTS: "run_tests",
    INSTALL_DEPENDENCY: "install_dependency",
    BUILD_PROJECT: "build_project",
  
    // Git
    GIT_STATUS: "git_status",
    GIT_DIFF: "git_diff",
    GIT_COMMIT: "git_commit",
    GIT_LOG: "git_log",
    CREATE_BRANCH: "create_branch",
  
    // Web
    SEARCH_WEB: "search_web",
    FETCH_URL: "fetch_url",
  
    // Code
    SEARCH_CODE: "search_code",
    FIND_SYMBOL: "find_symbol",
    ANALYZE_CODE: "analyze_code",
    FORMAT_CODE: "format_code",
  } as const;
  
  export type ToolName =
    (typeof ToolNames)[keyof typeof ToolNames];