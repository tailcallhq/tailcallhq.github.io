---
title: Installation & Updates
sidebar_position: 2
---

To run Tailcall, you need to have Java 20 or above installed on your machine.

## Homebrew

1. If you don't already have Homebrew installed, you can find the instructions [here](https://brew.sh/).

2. Add the Tailcall repository to Homebrew by running the following command in your terminal:
   ```shell
   brew tap tailcallhq/tailcall
   brew install tailcall
   ```
3. Verify that Tailcall is installed correctly by running:
   ```shell
   tc
   ```
4. To start the Tailcall server, execute the following command:

   ```shell
   tc-server
   ```

   This will initiate the server at `http://localhost:8080/graphql`.

5. Once installation is done, **upgrades** can be performed via:

   ```bash
   brew update
   brew upgrade tailcall
   ```
