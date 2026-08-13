import { ToolDefinition } from './Tool.ts';
import { ToolDescriptions } from './ToolDescriptions.ts';
import { ToolName, ToolNames } from './ToolNames.ts';

export const ToolSchemas: Record<ToolName, ToolDefinition> = {
  // Filesystem

  read_file: {
    name: ToolNames.READ_FILE,
    description: ToolDescriptions[ToolNames.READ_FILE],

    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file to read.',
        },
      },
      required: ['path'],
    },
  },

  write_file: {
    name: ToolNames.WRITE_FILE,
    description: ToolDescriptions[ToolNames.WRITE_FILE],

    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file to write.',
        },
        content: {
          type: 'string',
          description: 'Content to write to the file.',
        },
      },
      required: ['path', 'content'],
    },
  },

  delete_file: {
    name: ToolNames.DELETE_FILE,
    description: ToolDescriptions[ToolNames.DELETE_FILE],

    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file or directory to delete.',
        },
      },
      required: ['path'],
    },
  },

  list_files: {
    name: ToolNames.LIST_FILES,
    description: ToolDescriptions[ToolNames.LIST_FILES],

    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Directory path to list.',
        },
      },
      required: ['path'],
    },
  },

  move_file: {
    name: ToolNames.MOVE_FILE,
    description: ToolDescriptions[ToolNames.MOVE_FILE],

    inputSchema: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
          description: 'Path of the file or directory to move.',
        },
        destination: {
          type: 'string',
          description: 'Destination path.',
        },
      },
      required: ['source', 'destination'],
    },
  },

  copy_file: {
    name: ToolNames.COPY_FILE,
    description: ToolDescriptions[ToolNames.COPY_FILE],

    inputSchema: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
          description: 'Path of the file or directory to copy.',
        },
        destination: {
          type: 'string',
          description: 'Destination path.',
        },
      },
      required: ['source', 'destination'],
    },
  },

  search_files: {
    name: ToolNames.SEARCH_FILES,
    description: ToolDescriptions[ToolNames.SEARCH_FILES],

    inputSchema: {
      type: 'object',
      properties: {
        pattern: {
          type: 'string',
          description: 'Pattern to search for.',
        },
        path: {
          type: 'string',
          description: 'Directory in which to search.',
        },
      },
      required: ['pattern'],
    },
  },

  // Shell / execution

  run_command: {
    name: ToolNames.RUN_COMMAND,
    description: ToolDescriptions[ToolNames.RUN_COMMAND],

    inputSchema: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description: 'Shell command to execute.',
        },
        workingDirectory: {
          type: 'string',
          description: 'Directory in which to execute the command.',
        },
      },
      required: ['command'],
    },
  },

  run_tests: {
    name: ToolNames.RUN_TESTS,
    description: ToolDescriptions[ToolNames.RUN_TESTS],

    inputSchema: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description: "Optional test command. If omitted, use the project's default test command.",
        },
        workingDirectory: {
          type: 'string',
          description: 'Directory in which to run the tests.',
        },
      },
      required: [],
    },
  },

  install_dependency: {
    name: ToolNames.INSTALL_DEPENDENCY,
    description: ToolDescriptions[ToolNames.INSTALL_DEPENDENCY],

    inputSchema: {
      type: 'object',
      properties: {
        package: {
          type: 'string',
          description: 'Name of the dependency to install.',
        },
        development: {
          type: 'boolean',
          description: 'Whether to install the dependency as a development dependency.',
        },
      },
      required: ['package'],
    },
  },

  build_project: {
    name: ToolNames.BUILD_PROJECT,
    description: ToolDescriptions[ToolNames.BUILD_PROJECT],

    inputSchema: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description:
            "Optional build command. If omitted, use the project's default build command.",
        },
        workingDirectory: {
          type: 'string',
          description: 'Directory in which to build the project.',
        },
      },
      required: [],
    },
  },

  // Git

  git_status: {
    name: ToolNames.GIT_STATUS,
    description: ToolDescriptions[ToolNames.GIT_STATUS],

    inputSchema: {
      type: 'object',
      properties: {
        workingDirectory: {
          type: 'string',
          description: 'Git repository directory.',
        },
      },
      required: [],
    },
  },

  git_diff: {
    name: ToolNames.GIT_DIFF,
    description: ToolDescriptions[ToolNames.GIT_DIFF],

    inputSchema: {
      type: 'object',
      properties: {
        workingDirectory: {
          type: 'string',
          description: 'Git repository directory.',
        },
        staged: {
          type: 'boolean',
          description: 'Whether to show staged changes instead of unstaged changes.',
        },
      },
      required: [],
    },
  },

  git_commit: {
    name: ToolNames.GIT_COMMIT,
    description: ToolDescriptions[ToolNames.GIT_COMMIT],

    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Commit message.',
        },
        workingDirectory: {
          type: 'string',
          description: 'Git repository directory.',
        },
      },
      required: ['message'],
    },
  },

  git_log: {
    name: ToolNames.GIT_LOG,
    description: ToolDescriptions[ToolNames.GIT_LOG],

    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'integer',
          description: 'Maximum number of commits to return.',
          minimum: 1,
        },
        workingDirectory: {
          type: 'string',
          description: 'Git repository directory.',
        },
      },
      required: [],
    },
  },

  create_branch: {
    name: ToolNames.CREATE_BRANCH,
    description: ToolDescriptions[ToolNames.CREATE_BRANCH],

    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the new Git branch.',
        },
        workingDirectory: {
          type: 'string',
          description: 'Git repository directory.',
        },
        checkout: {
          type: 'boolean',
          description: 'Whether to switch to the new branch after creating it.',
        },
      },
      required: ['name'],
    },
  },

  // Web

  search_web: {
    name: ToolNames.SEARCH_WEB,
    description: ToolDescriptions[ToolNames.SEARCH_WEB],

    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query.',
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of search results.',
          minimum: 1,
        },
      },
      required: ['query'],
    },
  },

  fetch_url: {
    name: ToolNames.FETCH_URL,
    description: ToolDescriptions[ToolNames.FETCH_URL],

    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'URL to fetch.',
        },
      },
      required: ['url'],
    },
  },

  // Code

  search_code: {
    name: ToolNames.SEARCH_CODE,
    description: ToolDescriptions[ToolNames.SEARCH_CODE],

    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Text or pattern to search for in source code.',
        },
        path: {
          type: 'string',
          description: 'Directory or file in which to search.',
        },
        filePattern: {
          type: 'string',
          description: 'Optional file pattern, such as *.ts.',
        },
      },
      required: ['query'],
    },
  },

  find_symbol: {
    name: ToolNames.FIND_SYMBOL,
    description: ToolDescriptions[ToolNames.FIND_SYMBOL],

    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the symbol to find.',
        },
        path: {
          type: 'string',
          description: 'Directory or file in which to search.',
        },
        kind: {
          type: 'string',
          description: 'Optional symbol kind, such as class, function, interface, or variable.',
        },
      },
      required: ['name'],
    },
  },

  analyze_code: {
    name: ToolNames.ANALYZE_CODE,
    description: ToolDescriptions[ToolNames.ANALYZE_CODE],

    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the source file or directory to analyze.',
        },
        question: {
          type: 'string',
          description: 'Specific question or aspect of the code to analyze.',
        },
      },
      required: ['path'],
    },
  },

  format_code: {
    name: ToolNames.FORMAT_CODE,
    description: ToolDescriptions[ToolNames.FORMAT_CODE],

    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the source file or directory to format.',
        },
        check: {
          type: 'boolean',
          description: 'If true, only check formatting without modifying files.',
        },
      },
      required: ['path'],
    },
  },
};
