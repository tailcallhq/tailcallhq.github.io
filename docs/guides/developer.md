---
title: Run the server in watch mode using entr
sidebar_position: 7
---

Developers often find themselves in situations where they need to run a server in watch mode to streamline the development process. This guide will introduce you to `entr` : "https://eradman.com/entrproject/", a versatile file-watcher tool, and demonstrate how to run your server in watch mode with it. We'll also touch on the installation process and suggest some best practices to optimize your workflow.

## Why You Need Watch Mode

Running a server in watch mode offers several key benefits:

- `Real-time Feedback` : Watch mode ensures that your server stays up-to-date with your code changes. It immediately reflects those changes, providing you with real-time feedback during development.
- `Efficency` : Manually restarting the server each time you modify code can be tedious and time-consuming. Watch mode automates this process, making development more efficient.
- `Debugging` : It helps you quickly identify and fix issues as they arise, reducing the debugging time. When your server automatically restarts upon code changes, you catch errors sooner.

## Using `entr` for Watch Mode

`entr` is a powerful file-watching utility that makes running a server in watch mode a breeze. Let's go through the steps for the installation process for different operating system :

### 1.Installation Guide for `entr`

#### macOS

##### Installation on macOS using Homebrew

1. Open the Terminal, which you can find in the "Utilities" folder within the "Applications" folder.

2. Install Homebrew if you haven't already. Run the following command in your Terminal:

```graphql 
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
3. Once Homebrew is installed, you can install `entr` by running the following command:

```graphql 
    brew install entr
```
4. To verify the installation, run:
```graphql 
    entr --version
```
If the installation is done correctly it will shown the latest version of the `entr`

#### Windows

##### Installation on Windows using WSL (Windows Subsystem for Linux)

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
If the installation is done correctly it will shown the latest version of the `entr`

#### Linux 

##### Installation on Linux

1. On Linux, you can install `entr` using your distribution's package manager. For example, on Ubuntu, use:

```graphql 
    sudo apt update
    sudo apt install entr
```
4. To verify the installation, run:
```graphql 
    entr --version
```
If the installation is done correctly it will shown the latest version of the `entr`

### 2.Running Your Server in Watch Mode

To run your server in watch mode using `entr`, you'll utilize the `ls` command to list the files you want to monitor. The general syntax is as follows:

```graphql
    ls ./examples/jsonplaceholder.graphql | entr -r tc start ./examples/jsonplaceholder.graphql
```

### 3.Enjoy Auto-Reloading

With this setup, your server will run in watch mode. Whenever a file in the specified directory changes, `entr` will trigger your server to automatically restart, giving you an up-to-date development environment.

## Some Best Practices

To make the most of running a server in watch mode with `entr`, consider the following best practices:

1. ** Use a Build System **: For larger projects, consider integrating a build system like Webpack, Gulp, or Parcel to automate tasks and manage file dependencies. `entr` can watch the output directory of your build system.

2. ** Continuous Testing **: Implement automated testing within your watch mode workflow. Running tests whenever files change ensures that your code remains reliable and bug-free.

3. ** Continuous Testing **: Implement automated testing within your watch mode workflow. Running tests whenever files change ensures that your code remains reliable and bug-free.

4. ** Robust Logging and Error Handling **: Ensure your server and code have proper logging and error handling mechanisms in place. This will help you identify and address issues quickly during development.

5. ** Selective File Watching **: Be selective about which files you monitor with `entr`. Watching unnecessary files can lead to increased CPU and memory usage. Focus on the essential files related to your project.


By following these best practices and using `entr` effectively, you can significantly improve your development workflow. Experiment with `entr`, adapt it to your project's specific requirements, and enjoy a smoother and more efficient development process. Happy coding!