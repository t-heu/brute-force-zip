use std::string::String;
use std::env;
use std::convert::TryInto;
use std::fs::File;
use std::io::prelude::*;

fn main() {
  let args: Vec<String> = env::args().collect();

  // let query = &args[1];
  let filename = &args[2];

  // Ex: cargo run test sample.txt
  match filename.as_str() {
    "generate_numbers" => generate_numbers(4),
    "generate_letters_and_numbers" => generate_letters_and_numbers(2),
    "wordlist" => wordlist(),
    _ => println!("Ain't special"),
  }
}

fn wordlist() {
  let mut f = File::open("wordlists/one.txt").expect("file not found");

  let mut contents = String::new();
  f.read_to_string(&mut contents)
    .expect("something went wrong reading the file");

  let possibles = contents.split("\n");
  for e in possibles {
    println!("With text: {:?} - ", e); 
  }
}
  
fn generate_numbers(t: u32) {
  let numbers = vec!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  all_possible_combinations(&numbers, t, "".to_string());
}
  
fn generate_letters_and_numbers(t: u32) {
  let chars = vec!['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
  'm', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 
  'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', 
  '6', '7', '8', '9'];
  
  all_possible_combinations(&chars, t, "".to_string());
}
  
fn all_possible_combinations(input: &Vec<char>, length: u32, curstr: String) {
  if curstr.chars().count() == length.try_into().unwrap() {
    return;
  }
  
  for i in input.iter() {
    let mut str = String::from(&curstr);
    str.push(*i);
    all_possible_combinations(&input, length, str);
  }
}
