---
title: Mutability
sidebar_position: 2
description: "Explore best practices for handling mutability in programming with our detailed guide. Learn when to use references versus ownership in functions with clear examples. This guideline helps developers optimize their code for better performance and clarity, especially in performance-sensitive environments. Ideal for contributors and programmers looking to refine their coding techniques and understanding of mutability."
---

Typically you would have a question about an argument being passed as a value vs as a reference specially if you are new to Rust. This is short guide that will help in deciding when to use mutability in the Tailcall codebase.

## Using References

When calling functions that do not need to modify the values they receive, pass references to these values. This avoids unnecessary copying and preserves the original data integrity.💰

Consider a function that calculates the total number of items in a list. This function does not alter the list, so pass the list as a reference:

```rust
fn count_items(items: &Vec<i32>) -> usize {
    items.len()
}
let my_items = vec![1, 2, 3];
let total = count_items(&my_items);
```

## Using Ownership

When calling functions that need to modify the values they receive, pass ownership of these values to the function. This makes it clear that the function might change the value. Ensure that the modified values are returned from the function if further use is required.

Consider a function that adds an item to a list. Since this modifies the list, pass the list with ownership and return the modified list:

```rust
fn add_item(mut items: Vec<i32>, item: i32) -> Vec<i32> {
    items.push(item);
    items
}
let my_items = vec![1, 2, 3];
let updated_items = add_item(my_items, 4);
```

## Using Mutable References

Mutable references are particularly useful when you need to modify the data a function receives without taking ownership of it. This approach is ideal for types that behave like classical stateful services, where maintaining state across multiple function calls is necessary.

Consider a caching mechanism where data needs to be frequently updated or retrieved based on function calls. In this case, using a mutable reference allows the cache to be updated without transferring ownership each time:

```rust
struct Cache {
    data: HashMap<String, String>,
}

impl Cache {
    fn add_entry(&mut self, key: String, value: String) {
        self.data.insert(key, value);
    }

    fn get_entry(&self, key: &str) -> Option<&String> {
        self.data.get(key)
    }
}

let mut my_cache = Cache { data: HashMap::new() };
my_cache.add_entry("session1".to_string(), "User123".to_string());
if let Some(user) = my_cache.get_entry("session1") {
    println!("Cached user: {}", user);
}
```

:::note
Even though in Rust mutability is a lot more tamed than other languages, as a standard we try to stay away from mutable references as much as possible.
:::

## Exceptions

The approach outlined above may not be suitable for performance-sensitive components or frequently executed sections of code (hot code paths). In such scenarios, prioritize efficiency and adopt optimization strategies to enhance performance. Sometimes the API design of a dependent library can also influence the way we write code. These are all the exceptions where it's ok to move away from the above set guidelines.
