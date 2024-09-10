---
title: "GraphQL Conf Hackathon 2024"
description: "Get ready for an adrenaline-pumping, 3-day coding marathon where your mission is clear: Build the fastest, most resilient GraphQL server and prove you can beat Tailcall's performance!"
slug: ../graphql-conf-hackathon-2024
---

# 🚀 GraphQL Conf Hackathon 2024

Get ready for an adrenaline-pumping, 3-day coding marathon where your mission is clear: **Build the fastest, most resilient GraphQL server** and prove you can **beat Tailcall's performance!**

Winner takes home a **$5,000 cash prize** and the bragging rights of being the fastest GraphQL server in the galaxy. Are you up for the challenge?

**When?**

- **Start Date:** 10th September 2024, 8:00 AM PDT
- **End Date:** 12th September 2024, 4:00 PM PDT

This is more than just a competition—it's a race against time, a test of skill, and your chance to make some real money at the conf. The clock is ticking. Are you ready to outcode, outthink, and outperform? Let's do this!

## Getting Started

Support the following GraphQL schema:

```graphql
schema {
  query: Query
}

type Query {
  posts: [Post]
  post(id: Int!): Post
  users: [User]
  user(id: Int!): User
}

type Post {
  id: Int
  userId: Int!
  title: String
  body: String
  user: User
}

type User {
  id: Int
  name: String
  username: String
  email: String
  address: Address
  phone: String
  website: String
  posts: [Post]
}

type Address {
  zipcode: String
  geo: Geo
}

type Geo {
  lat: Float
  lng: Float
}
```

## Technical Requirements

1. Repository should be forked from [Tailcall's GraphQL Conf Hackathon 2024](https://github.com/tailcallhq/hackathon)
2. All CI tests should pass.
3. Your implementation should be under the `/projects` directory.
4. Should support any query that is supported by the schema.

## And Some More...

- We might add new tests and modify the existing ones to ensure there is no hardcoding and it's a level playing field for all.
- If you have questions or doubts about the hackathon, connect with us on [Discord](https://discord.gg/GJHMeZup8m) or [X](https://x.com/tailcallhq) or the only two people in that bright yellow T-shirt they'd be glad to say 👋.

## Scoring

1. **Test Execution:** For every commit, a set of predefined tests and benchmarks are executed. These tests are located in the `./tests` directory.

2. **Throughput Normalization:**

   - Your performance is measured in terms of requests per second (RPS) for each query.
   - This performance is then compared to Tailcall's RPS for the same query.
   - The comparison is done by dividing your RPS by Tailcall's RPS. This gives a normalized score for each query.

     **Example:**

     - For the `posts-title` query:
       - If your RPS is `100` and Tailcall's RPS is `50`, the normalized score for this query would be `100/50 = 2.0`.

3. **Final Score Calculation:**

   - The normalized scores for all queries are averaged.
   - The final score is this average multiplied by 1000.

**Example:**

  - Given the following scores:
    | Query | Your RPS | Tailcall RPS | Normalized |
    | ----------------- | -------- | ------------ | ---------- |
    | `posts-nested` | 100 | 50 | 2.0 |
    | `posts-title` | 200 | 350 | 0.8 |
    | `posts-with-user` | 300 | 250 | 1.2 |

  - The average normalized score is `(2.0 + 0.8 + 1.2) / 3 = 1.33`.
  - The final score would be `1.33 * 1000 = 1,333.33`.

## FAQs

**How do I submit my solution?**  
Submit your solution as a pull request (PR) from your forked repo to the main repo.

**What should my PR include?**  
Your PR should only include file additions inside `/projects/${participant_name}`. Don't change any other files or code belonging to other participants.

**Can I use any language or tools?**  
Yes, you can use any language, framework, or tools as long as they're within the scope of the licenses. However, the [tailcall](https://github.com/tailcallhq/tailcall/) tool is not allowed.

**What should be included in the solution?**  
Your solution should include all the source code and setup instructions necessary to understand how you achieved the solution and how to run it.

**Can I work with others on the solution?**  
Yes, you can collaborate, but only the person who submits the PR will be eligible to win the prize.

**What if there are multiple solutions with identical code?**  
Any kind of plagiarism will result in a ban, Check our guidelines below on plagiarism for more.

**What if two solutions have the same score?**
When multiple solutions achieve identical scores, the tiebreaker will be determined by the timestamp of their most recent commit. The solution with the earlier last commit will be declared the winner in such cases.

<details>
<summary><strong>Contribution Guidelines</strong></summary>

### Data Source (Upstream REST API)

On the CI your GraphQL server will need to fetch data from the upstream REST API at:

**Base URL**: `http://localhost:3000`

### Endpoints

- **GET** `/posts`  
  _Returns a list of posts._

- **GET** `/posts/:id`  
  _Returns a post by ID._

- **GET** `/users`  
  _Returns a list of users._

- **GET** `/users/:id`  
  _Returns a user by ID._

- **GET** `/users?id=1&id=2&id=3`  
  _Returns multiple users with IDs specified in query parameters._

The structure of the REST API responses will match the GraphQL schema fields.

### GraphQL server

Your GraphQL server should start on url `http://localhost:8000/graphql` and serve `POST` Graphql requests on it.

## Getting Started

1. Fork this repository
2. Clone the repository locally or run the codespace of your choice
3. Add new folder to `./projects` folder with your username. Copy the `/template` folder content from the repository root to your folder to populate required files.
4. Add the code of the implementation inside the folder

- you could use any language or tool by your choice that allows you to create the required GraphQL server. Just make sure the solution could be replicated in Github Actions environment.
- use the `schema.graphql` file from the root of the repo. Feel free to copy the file to your folder and change it the way you needed to work properly, but don't change the structure of types

5. Add `run.sh` file that installs required tools and runs the server

- the script is running on [Github Hosted runner](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners). List of available tools and packages could be found [here](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md)
- first add installation and build steps for required tools and code. E.g. `npm i` or `cargo build --release`
- add steps to start the server. E.g. `npm start` or `cargo run --release`
- make sure the script is marked as executable `chmod +x run.sh`

6. Make sure your code is working and handles GraphQL requests
7. Commit and push changes to your fork
8. Create a pull request from your fork into original repository

### Run mock server locally

To run the mock server locally you need a [Rust toolchain](https://rustup.rs) installed.

To run the mock server in the root of the repo run:

```sh
cargo run -p mock-api
```

The server will start on `http://localhost:3000` and will serve the endpoints mentioned in [data source](#data-source-upstream-rest-api)

### Run test suite locally

To run the whole test suite locally you need a [Rust toolchain](https://rustup.rs) installed.

For the first time you need to build the mock server code (one-time run):

```sh
cargo build -p mock-api
```

After finishing the command you can use following command to run test suite:

```sh
cargo run
```

If you need to run only specific project, specify this project as option with name of the directory of the project:

```sh
cargo run -- --project tailcall
```

## How implementation is checked

1. Build everything that is required to run test environment and custom implementation
2. Start the test environment to validate response: mock server and reference server that is used to test implementation correctness
3. Run correctness tests
4. Run the benchmark
5. Run correctness tests again

### Testing correctness

For testing the correctness repeat next process multiple times:

1. Regenerate mocks on mock-api server
2. For every request in `/tests` directory execute the request to user implementation
3. Execute the same request for reference implementation
4. Compare the results and in case they are mismatch throw an error

### Benchmarking the performance

Ran many requests in parallel to the server with tools like `wrk` or `k6` to collect info about provided RPS and latency

</details>

<details>
  <summary>Terms and Conditions</summary>

1. **Final Decision**: Tailcall reserves the exclusive right to determine the winner of the GraphQL Conf Hackathon 2024. The decision made by Tailcall is final and binding. No disputes, appeals, or challenges to the outcome will be entertained, either during the event or after its conclusion.

2. **Right to Disqualify**: Tailcall retains the right to disqualify any participant or team at any stage of the hackathon for reasons including, but not limited to, violations of the rules, inappropriate conduct, attempts to manipulate or cheat the scoring system, or any activity deemed unethical or unfair. Such disqualification decisions are at the sole discretion of Tailcall and will not be subject to review or reversal.

3. **Intellectual Property**: By submitting your solution, you agree that all work is your own or properly licensed. Any form of plagiarism, submission of duplicate solutions, or unauthorized use of third-party intellectual property will result in immediate disqualification. Participants are responsible for ensuring that their work complies with all applicable intellectual property laws and licenses.

4. **No Legal Recourse**: Participants acknowledge that they are participating in the hackathon at their own risk and discretion. Tailcall’s decision regarding winners, disqualifications, or any aspect of the competition will not be subject to any form of legal recourse, challenge, or litigation. Participants waive any rights to seek compensation, damages, or legal action against Tailcall or its affiliates.

5. **Tiebreaker and Scoring**: In the event of a tie, Tailcall will decide the winner based on a tiebreaker determined by the timestamp of the last valid commit. Tailcall also reserves the right to alter or adjust scoring criteria to ensure fairness and integrity. These changes will be communicated, but participants agree that such changes will not be a basis for challenge.

6. **Modification of Rules**: Tailcall reserves the right to modify or amend the rules, guidelines, or requirements of the hackathon at any time to ensure a fair and transparent competition. Any changes will be announced promptly, and participants are expected to comply with updated rules. Failure to adhere to the modified rules may result in disqualification.

7. **Collaboration and Multiple Entries**: While collaboration is allowed, only one individual from a team may submit the final entry. Tailcall will not accept any disputes arising from team collaborations. Any identical or highly similar solutions submitted by different participants will be investigated, and Tailcall reserves the right to disqualify participants if plagiarism or collusion is suspected.

8. **Use of Submissions**: By submitting your entry, you grant Tailcall the right to use, display, and promote your submission for purposes related to the hackathon or future events, including marketing or showcasing your work. However, all intellectual property rights to the original code remain with the participants, unless explicitly stated otherwise.

</details>
