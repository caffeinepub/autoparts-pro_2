import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Disc3,
  Facebook,
  Headphones,
  Instagram,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Twitter,
  User,
  Wrench,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { BlogPost, Product } from "./backend.d";
import {
  useBlogPosts,
  useProducts,
  useSubmitContact,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

// ─── Static seed data ────────────────────────────────────────────────────────

const SEED_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "High-Performance Turbo Engine Kit",
    description: "Complete turbocharger kit for 20-40% power boost",
    category: "engine" as any,
    rating: 4.9,
    price: 85000,
    reviewCount: 128n,
  },
  {
    id: 2n,
    name: "Premium Ceramic Brake Pads",
    description: "Low-dust ceramic formula for superior stopping power",
    category: "brake" as any,
    rating: 4.8,
    price: 12500,
    reviewCount: 243n,
  },
  {
    id: 3n,
    name: "LED Headlight Conversion Kit",
    description: "6000K cool white, 10x brighter than halogen",
    category: "electrical" as any,
    rating: 4.7,
    price: 22000,
    reviewCount: 189n,
  },
  {
    id: 4n,
    name: "Sport Suspension Coilover Set",
    description: "Height-adjustable coilovers for track or street",
    category: "suspension" as any,
    rating: 4.6,
    price: 95000,
    reviewCount: 97n,
  },
  {
    id: 5n,
    name: "Cold Air Intake System",
    description: "Increases airflow for horsepower and fuel efficiency gains",
    category: "engine" as any,
    rating: 4.5,
    price: 35000,
    reviewCount: 312n,
  },
  {
    id: 6n,
    name: "Slotted Drilled Rotor Pair",
    description: "Enhanced heat dissipation for fade-free braking",
    category: "brake" as any,
    rating: 4.7,
    price: 28000,
    reviewCount: 156n,
  },
];

const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: 1n,
    title: "Top 5 Engine Upgrades for Better Performance",
    excerpt:
      "Whether you're a weekend racer or a daily driver looking for more pep, these engine upgrades will transform your vehicle's performance without breaking the bank.",
    author: "Marcus Rodriguez",
    date: "March 15, 2026",
    category: "Engine",
  },
  {
    id: 2n,
    title: "How to Choose the Right Brake Pads for Your Vehicle",
    excerpt:
      "Brake pads aren't one-size-fits-all. Learn the differences between organic, semi-metallic, and ceramic pads and which performs best for your driving style.",
    author: "Sarah Chen",
    date: "March 8, 2026",
    category: "Brakes",
  },
  {
    id: 3n,
    title: "Understanding Your Car's Suspension System",
    excerpt:
      "A well-maintained suspension system is critical for safety and handling. Here's everything you need to know about shocks, struts, springs, and alignment.",
    author: "Jake Morrison",
    date: "February 28, 2026",
    category: "Suspension",
  },
];

const CATEGORIES = [
  {
    key: "toyota",
    label: "Toyota Parts",
    icon: Car,
    description: "Genuine Toyota Prado & Land Cruiser parts",
    count: "500+",
  },
  {
    key: "engine",
    label: "Engine Parts",
    icon: Settings2,
    description: "Maximize your engine's potential with our premium components",
    count: "1,200+",
  },
  {
    key: "brake",
    label: "Brake Parts",
    icon: Disc3,
    description: "Safety-critical brake components for reliable stopping power",
    count: "800+",
  },
  {
    key: "electrical",
    label: "Electrical Parts",
    icon: Zap,
    description: "From alternators to sensors — complete electrical solutions",
    count: "950+",
  },
  {
    key: "suspension",
    label: "Suspension Parts",
    icon: Layers,
    description: "Improve ride comfort and handling precision",
    count: "600+",
  },
  {
    key: "accessories",
    label: "Accessories",
    icon: Package,
    description: "Customize, protect, and enhance your vehicle",
    count: "2,000+",
  },
];

const SERVICES = [
  {
    icon: Wrench,
    title: "Parts Installation",
    description:
      "Our certified technicians install any part you purchase with expert precision.",
  },
  {
    icon: ShieldCheck,
    title: "Vehicle Inspection",
    description:
      "Comprehensive 150-point inspection to identify wear, damage, and safety issues.",
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description:
      "Same-day shipping on in-stock parts. Next-day delivery available nationwide.",
  },
  {
    icon: CheckCircle2,
    title: "Warranty & Returns",
    description:
      "2-year warranty on all parts. Hassle-free 30-day returns, no questions asked.",
  },
  {
    icon: Headphones,
    title: "Expert Consultation",
    description:
      "Free advice from our ASE-certified mechanics via phone, chat, or in-store.",
  },
  {
    icon: Package,
    title: "Parts Sourcing",
    description:
      "Can't find the part you need? We'll source any OEM or aftermarket component.",
  },
];

const TEAM = [
  { name: "Robert (Bobby) Hall", title: "Founder & CEO", years: 28 },
  { name: "Dana Kowalski", title: "Head Mechanic", years: 15 },
  { name: "Priya Nair", title: "Parts Specialist", years: 9 },
];

// ─── StarRating ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${
            s <= Math.round(rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

// ─── ProductCard ───────────────────────────────────────────────────────────

const PRODUCT_IMAGES: Record<string, string> = {
  engine: "/assets/generated/product-engine.dim_400x300.jpg",
  brake: "/assets/generated/product-brake.dim_400x300.jpg",
  electrical: "/assets/generated/product-electrical.dim_400x300.jpg",
  suspension: "/assets/generated/product-suspension.dim_400x300.jpg",
  accessories: "/assets/generated/product-engine.dim_400x300.jpg",
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const catKey: string = String(product.category as unknown);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary hover:shadow-[0_0_20px_oklch(0.76_0.12_85/0.15)] transition-all duration-300"
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="relative overflow-hidden h-48 bg-muted">
        <img
          src={PRODUCT_IMAGES[catKey] ?? PRODUCT_IMAGES.engine}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0 text-xs font-semibold uppercase tracking-wide">
          {catKey}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toString()})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            PKR {product.price.toLocaleString()}
          </span>
          <a
            href={`https://wa.me/923071111234?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-500 text-white border-0 text-xs font-semibold"
              data-ocid={`products.item.${index + 1}`}
            >
              <MessageCircle className="w-3 h-3 mr-1" /> Inquire
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── BlogCard ──────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary hover:shadow-[0_0_20px_oklch(0.76_0.12_85/0.12)] transition-all duration-300"
      data-ocid={`blog.item.${index + 1}`}
    >
      <div className="h-1 bg-primary" />
      <div className="p-6">
        <Badge className="mb-3 bg-primary/10 text-primary border-primary/30 text-xs font-medium">
          {post.category}
        </Badge>
        <h3 className="font-bold text-foreground text-base mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              {post.date}
            </span>
          </div>
          <a
            href="#blog"
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
            data-ocid={`blog.item.${index + 1}`}
          >
            Read More <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-navy-dark border-b border-border ${
        scrolled ? "shadow-[0_2px_20px_oklch(0.76_0.12_85/0.15)]" : ""
      }`}
      data-ocid="navbar.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 shrink-0"
            data-ocid="navbar.link"
          >
            <img
              src="/assets/uploads/logo-019d37d1-85a0-73a3-890e-fcf3d9f48fac-1.jpg"
              alt="AL Khan Auto & Imports"
              className="w-9 h-9 rounded object-cover border border-primary/40"
            />
            <span className="text-foreground font-bold text-base tracking-wide">
              AL KHAN <span className="text-primary">AUTO &amp; IMPORTS</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary text-sm font-medium px-3 py-2 rounded transition-colors relative group"
                data-ocid="navbar.link"
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-muted-foreground hover:text-primary p-2 transition-colors"
              aria-label="Search"
              data-ocid="navbar.button"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="https://wa.me/923071111234"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 p-2 transition-colors"
              aria-label="WhatsApp"
              data-ocid="navbar.whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              type="button"
              className="relative text-muted-foreground hover:text-primary p-2 transition-colors"
              aria-label="Cart"
              data-ocid="navbar.button"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
            <button
              type="button"
              className="lg:hidden text-muted-foreground hover:text-primary p-2 transition-colors"
              aria-label="Menu"
              onClick={() => setOpen(!open)}
              data-ocid="navbar.button"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-navy border-t border-border"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary text-sm font-medium py-2 border-b border-border transition-colors"
                  onClick={() => setOpen(false)}
                  data-ocid="navbar.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[580px] flex items-center overflow-hidden pt-16"
      style={{
        backgroundImage: `linear-gradient(to right, oklch(0.05 0 0 / 0.98) 0%, oklch(0.08 0.005 85 / 0.90) 55%, transparent 100%), url('/assets/generated/hero-auto-parts.dim_1600x600.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-ocid="hero.section"
    >
      {/* Gold geometric overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 top-0 w-96 h-96 border border-primary/15 rounded-full" />
        <div className="absolute -right-10 bottom-0 w-64 h-64 border border-primary/10 rounded-full" />
        <div className="absolute right-40 top-1/2 -translate-y-1/2 w-[1px] h-40 bg-primary/25" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <Badge className="mb-5 bg-primary/20 text-primary border-primary/40 text-xs font-semibold uppercase tracking-widest">
            PERFORMANCE YOU CAN TRUST
          </Badge>
          <p className="text-primary text-lg sm:text-xl font-bold uppercase tracking-widest mb-2">
            AL KAHN AUTO &amp; IMPORTS
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground uppercase leading-tight tracking-tight mb-4">
            PREMIUM PERFORMANCE
            <br />
            <span className="text-primary">PARTS FOR</span>
            <br />
            EVERY DRIVE
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
            Lahore's trusted supplier of Toyota Prado &amp; Land Cruiser genuine
            parts. Over 200,000 genuine and aftermarket parts in stock,
            delivered across Pakistan.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#products">
              <Button
                size="lg"
                className="bg-primary hover:bg-accent text-primary-foreground font-bold px-8 uppercase tracking-widest border-0"
                data-ocid="hero.primary_button"
              >
                SHOP NOW <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-semibold uppercase tracking-wider"
                data-ocid="hero.secondary_button"
              >
                Contact Us
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { value: "5K+", label: "Parts In Stock" },
              { value: "10K+", label: "Happy Customers" },
              { value: "15 Yrs", label: "In Business" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Car Showcase ──────────────────────────────────────────────────────────

function CarShowcaseSection() {
  const cars = [
    {
      name: "Toyota Land Cruiser",
      tagline: "The Ultimate 4x4 Legend",
      image: "/assets/generated/toyota-land-cruiser.dim_800x500.jpg",
    },
    {
      name: "Toyota Prado",
      tagline: "Power Meets Elegance",
      image: "/assets/generated/toyota-prado.dim_800x500.jpg",
    },
  ];

  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            Genuine OEM Parts
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-3">
            Toyota Prado &amp; Land Cruiser
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Lahore's trusted supplier of genuine parts for Pakistan's most
            popular SUVs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cars.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative overflow-hidden rounded-2xl border border-primary/30 group cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-2xl font-extrabold uppercase tracking-tight mb-1">
                  {car.name}
                </h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-widest">
                  {car.tagline}
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-primary/90 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Genuine Parts Available
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Products ──────────────────────────────────────────────────────

const PRODUCT_TABS = [
  { key: "prado", label: "Toyota Prado Parts" },
  { key: "landcruiser", label: "Toyota Land Cruiser Parts" },
  { key: "engine", label: "Engine Parts" },
  { key: "brake", label: "Brake Parts" },
  { key: "suspension", label: "Suspension Parts" },
  { key: "accessories", label: "Accessories" },
  { key: "electrical", label: "Electrical Parts" },
];

function ToyotaPartCard({
  part,
  index,
  model,
}: {
  part: { name: string; image: string; price: number };
  index: number;
  model: string;
}) {
  const waModel =
    model === "Toyota Prado" ? "Toyota%20Prado" : "Toyota%20Land%20Cruiser";
  return (
    <motion.div
      key={`${model}-${part.name}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary hover:shadow-[0_0_20px_oklch(0.76_0.12_85/0.15)] transition-all duration-300"
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="relative overflow-hidden h-44 bg-muted">
        <img
          src={part.image}
          alt={`${model} ${part.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0 text-xs font-semibold">
          {model}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3 leading-snug">
          {part.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            PKR {part.price.toLocaleString()}
          </span>
          <a
            href={`https://wa.me/923071111234?text=Hello%2C%20I%20am%20interested%20in%20${waModel}%20${encodeURIComponent(part.name)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-500 text-white border-0 text-xs font-semibold"
              data-ocid={`products.item.${index + 1}`}
            >
              <MessageCircle className="w-3 h-3 mr-1" /> Inquire
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProductsSection() {
  const { data: products, isLoading } = useProducts();
  const [activeTab, setActiveTab] = useState("prado");
  const displayProducts =
    products && products.length > 0 ? products : SEED_PRODUCTS;

  const filteredProducts = displayProducts.filter(
    (p) => String(p.category as unknown) === activeTab,
  );

  return (
    <section id="products" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            Browse By Category
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-3">
            OUR PRODUCTS
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        {/* Category tabs */}
        <div className="overflow-x-auto pb-2 mb-8">
          <div className="flex gap-2 min-w-max mx-auto justify-start sm:justify-center">
            {PRODUCT_TABS.map((tab) => (
              <button
                type="button"
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide border transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_oklch(0.76_0.12_85/0.4)]"
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
                data-ocid={"products.tab"}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {isLoading ? (
          <div
            className="flex justify-center py-16"
            data-ocid="products.loading_state"
          >
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : activeTab === "prado" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {TOYOTA_PARTS.map((part, i) => (
              <ToyotaPartCard
                key={part.name}
                part={part}
                index={i}
                model="Toyota Prado"
              />
            ))}
          </div>
        ) : activeTab === "landcruiser" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {TOYOTA_PARTS.map((part, i) => (
              <ToyotaPartCard
                key={part.name}
                part={part}
                index={i}
                model="Toyota Land Cruiser"
              />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="products.empty_state"
          >
            <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No products found in this category.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold uppercase tracking-wider transition-colors px-8"
            data-ocid="products.button"
          >
            View All Products <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Toyota Parts ──────────────────────────────────────────────────────────

const TOYOTA_PARTS = [
  {
    name: "Door",
    image: "/assets/generated/part-door.dim_600x400.jpg",
    price: 45000,
  },
  {
    name: "Sunroof",
    image: "/assets/generated/part-sunroof.dim_600x400.jpg",
    price: 85000,
  },
  {
    name: "Headlights",
    image: "/assets/generated/part-headlights.dim_600x400.jpg",
    price: 32000,
  },
  {
    name: "Side Mirrors",
    image: "/assets/generated/part-side-mirrors.dim_600x400.jpg",
    price: 18000,
  },
  {
    name: "Dashboard",
    image: "/assets/generated/part-dashboard.dim_600x400.jpg",
    price: 120000,
  },
  {
    name: "LCD",
    image: "/assets/generated/part-lcd.dim_600x400.jpg",
    price: 65000,
  },
  {
    name: "Bonnet",
    image: "/assets/generated/part-bonnet.dim_600x400.jpg",
    price: 55000,
  },
  {
    name: "Side Panel",
    image: "/assets/generated/part-side-panel.dim_600x400.jpg",
    price: 38000,
  },
];

function ToyotaPartsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            Genuine OEM
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-3">
            TOYOTA GENUINE PARTS
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Official supplier of genuine Toyota parts for Prado and Land Cruiser
            models. All parts come with manufacturer warranty.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-lg px-4 py-2">
            <p className="text-muted-foreground text-xs">
              AL Khan Auto &amp; Imports is an authorized supplier of genuine
              Toyota Prado &amp; Land Cruiser parts in Pakistan.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {TOYOTA_PARTS.map((part, i) => (
            <motion.div
              key={part.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl overflow-hidden border border-border group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={part.image}
                  alt={part.name}
                  className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-2 left-2 text-foreground font-bold text-sm">
                  {part.name}
                </span>
              </div>
              <div className="p-3">
                <div className="text-primary font-bold text-sm mb-2">
                  PKR {part.price.toLocaleString()}
                </div>
                <a
                  href={`https://wa.me/923071111234?text=Hello%2C%20I%20am%20interested%20in%20Toyota%20${encodeURIComponent(part.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-500 text-white border-0 text-xs font-semibold"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" /> Inquire
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Us ──────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-3">
              WHO WE ARE
            </h2>
            <div className="w-16 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              AL Khan Auto &amp; Imports has been Lahore&apos;s trusted source
              for Toyota Prado and Land Cruiser genuine parts. Built on a
              foundation of{" "}
              <strong className="text-foreground">
                quality, honesty, and expertise
              </strong>
              , we serve customers across Punjab and all of Pakistan.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              As an official authorized parts supplier, every component we stock
              is genuine and comes with manufacturer warranty. Our team of
              experienced advisors helps you find exactly what your vehicle
              needs.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Years in Business", value: "15+" },
                { label: "Parts in Stock", value: "5K+" },
                { label: "Happy Customers", value: "10K+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-lg border border-border bg-card"
                >
                  <div className="text-2xl font-extrabold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-xl p-6 border border-border mb-6">
              <h3 className="font-bold text-foreground text-lg mb-4">
                Our Team
              </h3>
              <div className="space-y-4">
                {TEAM.map((member) => (
                  <div key={member.name} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">
                        {member.name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {member.title} · {member.years} years exp.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: CheckCircle2,
                  title: "OEM Certified",
                  desc: "Genuine manufacturer parts",
                },
                {
                  icon: ShieldCheck,
                  title: "2-Year Warranty",
                  desc: "On all parts sold",
                },
                {
                  icon: Truck,
                  title: "Fast Shipping",
                  desc: "Same-day dispatch",
                },
                {
                  icon: Headphones,
                  title: "Expert Support",
                  desc: "Experienced advisors",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-4 rounded-lg border border-border bg-card flex gap-3"
                >
                  <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {title}
                    </div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-3">
            OUR SERVICES
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            From installation to inspection, our expert team helps keep your
            vehicle running at peak performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Blog ──────────────────────────────────────────────────────────────────

function BlogSection() {
  const { data: posts, isLoading } = useBlogPosts();
  const displayPosts =
    posts && posts.length > 0 ? posts.slice(0, 3) : SEED_BLOG_POSTS;

  return (
    <section id="blog" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            From Our Workshop
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-3">
            LATEST ARTICLES
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>
        {isLoading ? (
          <div
            className="flex justify-center py-16"
            data-ocid="blog.loading_state"
          >
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.map((post, i) => (
              <BlogCard key={post.id.toString()} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { mutate, isPending, isSuccess, isError } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Message sent! We'll be in touch within 24 hours.");
        setForm({ name: "", email: "", phone: "", message: "" });
      },
      onError: () => toast.error("Something went wrong. Please try again."),
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground mb-3">
            CONTACT US
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 border border-border"
            data-ocid="contact.panel"
          >
            <h3 className="font-bold text-foreground text-xl mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5 block"
                    htmlFor="contact-name"
                  >
                    Full Name
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5 block"
                    htmlFor="contact-phone"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="contact-phone"
                    placeholder="+92 300-000-0000"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5 block"
                  htmlFor="contact-email"
                >
                  Email Address
                </label>
                <Input
                  id="contact-email"
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5 block"
                  htmlFor="contact-message"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us what part you are looking for or how we can help..."
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-accent text-primary-foreground font-bold uppercase tracking-widest border-0"
                data-ocid="contact.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "SEND MESSAGE"
                )}
              </Button>
              {isSuccess && (
                <p
                  className="text-green-500 text-sm text-center font-medium"
                  data-ocid="contact.success_state"
                >
                  Message sent successfully!
                </p>
              )}
              {isError && (
                <p
                  className="text-destructive text-sm text-center font-medium"
                  data-ocid="contact.error_state"
                >
                  Failed to send. Please try again.
                </p>
              )}
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div
              className="rounded-xl p-8 border border-primary/30"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.13 0.015 85) 0%, oklch(0.09 0.008 85) 100%)",
              }}
            >
              <h3 className="font-bold text-xl mb-6 text-foreground">
                AL KHAN AUTO &amp; IMPORTS
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      Address
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Lahore, Punjab, Pakistan
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      Phone
                    </div>
                    <div className="text-muted-foreground text-sm">
                      +92 307-111-1234
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      WhatsApp
                    </div>
                    <a
                      href="https://wa.me/923071111234?text=Hello%2C%20I%20have%20an%20inquiry%20about%20your%20parts."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-sm underline"
                    >
                      +92 307-111-1234
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      Email
                    </div>
                    <div className="text-muted-foreground text-sm">
                      alkhan.auto1122@gmail.com
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      Business Hours
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Mon - Sat: 9:00 AM - 8:00 PM
                      <br />
                      Sunday: 11:00 AM - 5:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-bold text-foreground mb-4 uppercase tracking-wide text-sm">
                Quick Answers
              </h4>
              <div className="space-y-3">
                {[
                  "Do you deliver across Pakistan?",
                  "Are all parts genuine OEM?",
                  "Do you ship internationally?",
                  "Can you source rare Prado parts?",
                ].map((q) => (
                  <div
                    key={q}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-navy-dark text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/logo-019d37d1-85a0-73a3-890e-fcf3d9f48fac-1.jpg"
                alt="AL Khan Auto & Imports"
                className="w-9 h-9 rounded object-cover border border-primary/40"
              />
              <span className="font-bold text-lg tracking-wide">
                AL KHAN <span className="text-primary">AUTO &amp; IMPORTS</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Lahore&apos;s trusted supplier of genuine Toyota Prado &amp; Land
              Cruiser parts. Quality you can count on.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#home"
                  aria-label={label}
                  className="w-8 h-8 bg-primary/10 border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-primary mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.key}>
                  <a
                    href="#products"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-primary mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              {[
                "Track Your Order",
                "Returns & Exchanges",
                "Warranty Policy",
                "Shipping Info",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#contact"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            &copy; {year} AL Khan Auto &amp; Imports. Built with love using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((card) => (
              <span
                key={card}
                className="text-xs bg-primary/10 border border-border text-muted-foreground px-2 py-1 rounded font-mono"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CarShowcaseSection />

        <ProductsSection />
        <ToyotaPartsSection />
        <AboutSection />
        <ServicesSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
