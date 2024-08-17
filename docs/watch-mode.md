---
title: GraphQL Server Watch Mode
description: "Learn how to enhance your development workflow by running servers in watch mode with the versatile file-watcher tool, entr. This guide provides installation instructions for different operating systems, usage tips, and best practices to optimize your development process."
slug: graphql-watch-mode-tailcall
sidebar_label: Watch Mode
---

Developers often find themselves in situations where they need to run a server in watch mode to streamline the development process. This guide will introduce you to [entr], a versatile file-watcher tool, and how to run your server in watch mode with it. We'll also touch on the installation process and suggest some best practices to optimize your workflow.

[entr]: https://eradman.com/entrproject/

## Use case

Running a server in watch mode offers a lot of key benefits:

- `Real-time Feedback`: Watch mode ensures that your server remains up-to-date with your code changes, instantly reflecting those changes and providing you with real-time feedback during development.
- `Efficiency`: Manually restarting the server each time you change code can be tedious and time-consuming. Watch mode automates this process, enhancing development efficiency.
- `Debugging`: It enables you to identify and resolve issues as they occur, reducing debugging time. With your server automatically restarting upon code changes, you detect errors earlier.

## Using `entr`

It's a powerful file-watching utility that makes running a server in watch mode a breeze. Let's go through the steps for the installation process for different operating system :

### Installation

#### Homebrew

1. Open the Terminal, which you can find in the "Utilities" folder within the "Applications" folder.

2. Install Homebrew if you haven't already. Run the following command in your Terminal:

   ```graphql
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

3. After installing Homebrew, proceed to install `entr` by executing the following command:

   ```graphql
   brew install entr
   ```

4. To verify the installation, run:

   ```graphql
   entr --version
   ```

Upon successful installation, it will display the latest version of `entr`.

#### Windows Subsystem

1. Install Windows Subsystem for Linux (WSL) on your Windows machine by following Microsoft's official documentation.

2. After setting up WSL, open the Linux terminal by running:

   ```graphql
       wsl -d <DistributionName>
   ```

   Replace `<DistributionName>` with the name of the Linux distribution that you have installed.

3. Install entr within the Linux terminal using the package manager of your chosen Linux distribution. For example, on Ubuntu, you can use:

   ```graphql
   sudo apt update
   sudo apt install entr
   ```

4. Verify the installation by running:

   ```graphql
   entr --version
   ```

A successful installation will display the latest version of `entr`.

#### apt-get

1. On Linux, you can install `entr` using your distribution's package manager. For example, on Ubuntu, use:

   ```graphql
   sudo apt update
   sudo apt install entr
   ```

2. To verify the installation, run:

   ```graphql
   entr --version
   ```

If you install it, it will show the latest version of the `entr`

### Watch Mode

To run your server in watch mode with `entr`, use the `ls` command to list the files you want to track. The general syntax is as follows:

```graphql
ls *.graphql | entr -r tailcall start ./jsonplaceholder.graphql
```

This command uses `entr` to continuously track the `jsonplaceholder.graphql` file and when it changes, It runs the `tailcall start` command with the file as an argument

Detailing the above command as follows:

1. `ls *.graphql` : This part of the code lists the file or files you want to track for changes. In this case, it lists the file named "jsonplaceholder.graphql" within the "examples" directory.

2. `|` : The pipe symbol ('|') takes the output of the preceding command (the file listing) and feeds it as input to the following command (entr).

3. `entr -r tc start ./jsonplaceholder.graphql` : Whenever the file "jsonplaceholder.graphql" changes, this command executes.

- `entr` is a command-line tool for running arbitrary commands whenever files change. It tracks the files specified in the previous command (`ls ./jsonplaceholder.graphql`)

- `r` : This flag instructs entr to persist in running the command through errors, ensuring continuous operation.

- `tc start ./jsonplaceholder.graphql` : This command runs upon detecting changes, executing `tc start` with the file path
  `./jsonplaceholder.graphql` as an argument

## Some Best Practices

To make the most of running a server in watch mode with `entr`, consider the following best practices:

1. **Selective File Watching**: Be selective about which files you track with `entr`. Watching unnecessary files can lead to increased CPU and memory usage. Focus on the essential files related to your project.

2. **Organize Your Project**: Maintain a well-organized project structure to make it easier to identify which files need tracking.

3. **Clear Output**: Clear the terminal output before running entr to have a clean workspace.

4. **Version Control**: Ensure that your project is under version control (e.g., Git) to track changes and revert if necessary.

5. **Update `entr`**: Ensure `entr` is always updated to the latest version for bug fixes and enhancements.

By following these best practices and using `entr` effectively, you can greatly improve your development workflow. Experiment with `entr`, adapt it to your project's specific requirements, and enjoy a smoother and more efficient development process. Happy coding!
