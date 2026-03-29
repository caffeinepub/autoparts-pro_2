import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Array "mo:core/Array";
import List "mo:core/List";

actor {
  type Category = {
    #engine;
    #brake;
    #electrical;
    #suspension;
    #accessories;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Product = {
    id : Nat;
    name : Text;
    category : Category;
    description : Text;
    price : Float;
    rating : Float;
    reviewCount : Nat;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    author : Text;
    date : Text;
    category : Text;
  };

  module ContactSubmission {
    public func compare(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  module Product {
    public func compare(a : Product, b : Product) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module BlogPost {
    public func compare(a : BlogPost, b : BlogPost) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  let products = List.fromArray<Product>([
    {
      id = 1;
      name = "Spark Plugs";
      category = #engine;
      description = "Premium quality spark plugs.";
      price = 15.99;
      rating = 4.7;
      reviewCount = 120;
    },
    {
      id = 2;
      name = "Brake Pads";
      category = #brake;
      description = "High performance brake pads.";
      price = 39.99;
      rating = 4.8;
      reviewCount = 200;
    },
    {
      id = 3;
      name = "Car Battery";
      category = #electrical;
      description = "Long-lasting car battery.";
      price = 79.99;
      rating = 4.5;
      reviewCount = 80;
    },
    {
      id = 4;
      name = "Shock Absorbers";
      category = #suspension;
      description = "Heavy duty shock absorbers.";
      price = 129.99;
      rating = 4.6;
      reviewCount = 95;
    },
    {
      id = 5;
      name = "Air Filter";
      category = #engine;
      description = "High efficiency air filter.";
      price = 19.99;
      rating = 4.4;
      reviewCount = 150;
    },
    {
      id = 6;
      name = "Wiper Blades";
      category = #accessories;
      description = "Durable wiper blades.";
      price = 29.99;
      rating = 4.3;
      reviewCount = 110;
    },
    {
      id = 7;
      name = "Oil Filter";
      category = #engine;
      description = "Premium oil filter.";
      price = 12.99;
      rating = 4.6;
      reviewCount = 140;
    },
    {
      id = 8;
      name = "Alternator";
      category = #electrical;
      description = "High output alternator.";
      price = 159.99;
      rating = 4.7;
      reviewCount = 60;
    },
    {
      id = 9;
      name = "Brake Rotors";
      category = #brake;
      description = "Top grade brake rotors.";
      price = 89.99;
      rating = 4.8;
      reviewCount = 115;
    },
    {
      id = 10;
      name = "Suspension Springs";
      category = #suspension;
      description = "Heavy duty suspension springs.";
      price = 109.99;
      rating = 4.5;
      reviewCount = 75;
    },
  ]);

  let blogPosts = List.fromArray<BlogPost>([
    {
      id = 1;
      title = "5 Tips for Car Maintenance";
      excerpt = "Learn simple yet effective ways to keep your car in top condition...";
      author = "John Doe";
      date = "2024-06-07";
      category = "Maintenance";
    },
    {
      id = 2;
      title = "Understanding Brake Systems";
      excerpt = "Brakes are a crucial component of any vehicle. This article explains...";
      author = "Jane Smith";
      date = "2024-06-05";
      category = "Brakes";
    },
    {
      id = 3;
      title = "Choosing the Right Car Battery";
      excerpt = "Battery selection can impact your car's performance. Here's what to look for...";
      author = "John Doe";
      date = "2024-06-03";
      category = "Electrical";
    },
  ]);

  let contactSubmissions = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let newSubmission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(newSubmission);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.toArray().reverse().sort();
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.filter(func(p) { category == p.category }).toArray().sort();
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.toArray().sort();
  };

  public query ({ caller }) func getBlogPostsByAuthor(author : Text) : async [BlogPost] {
    blogPosts.filter(func(p) { p.author == author }).toArray().sort();
  };

  public query ({ caller }) func getBlogPostsByCategory(category : Text) : async [BlogPost] {
    blogPosts.filter(func(p) { p.category == category }).toArray().sort();
  };
};
