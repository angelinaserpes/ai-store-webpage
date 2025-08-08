import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const products = [
  {
    id: "ai-assistant",
    name: "AI Assistant Pro",
    description: "Smart workflow automation for teams.",
    price: 49,
    rating: 4.8,
    reviews: 182,
    image: "/placeholder.svg",
  },
  {
    id: "dev-cloud",
    name: "Dev Cloud IDE",
    description: "Cloud-native coding with built-in CI.",
    price: 29,
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg",
  },
  {
    id: "monitor-ai",
    name: "AI Monitor",
    description: "Observability for ML & microservices.",
    price: 39,
    rating: 4.7,
    reviews: 95,
    image: "/placeholder.svg",
  },
  {
    id: "sec-suite",
    name: "SecOps Suite",
    description: "Realtime vulnerability insights.",
    price: 59,
    rating: 4.5,
    reviews: 76,
    image: "/placeholder.svg",
  },
];

const reviews = [
  { name: "Jordan P.", role: "CTO", text: "The AI tools boosted our delivery speed by 35%.", rating: 5 },
  { name: "Morgan S.", role: "ML Engineer", text: "Clean UX, powerful features, great support.", rating: 5 },
  { name: "Riley A.", role: "Founder", text: "Best value for modern AI-first teams.", rating: 4 },
];

const Index = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Title & meta
    const title = "AI & IT Store — Smart Tech at Great Prices";
    document.title = title;

    const desc = "AI & IT store with curated products, fair prices, trusted reviews, and fast support.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);

    // Structured data (Product list)
    const ldJsonId = "structured-data-products";
    const script = document.getElementById(ldJsonId) as HTMLScriptElement | null;
    const data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: products.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: window.location.origin + p.image,
          brand: { "@type": "Brand", name: "AI & IT Store" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: p.rating,
            reviewCount: p.reviews,
          },
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    } as const;

    const s = script ?? document.createElement("script");
    s.type = "application/ld+json";
    s.id = ldJsonId;
    s.text = JSON.stringify(data);
    if (!script) document.head.appendChild(s);
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    form.reset();
    toast({ title: "Message sent", description: "Thanks! We'll get back to you shortly." });
  };

  const renderStars = (count: number) => (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={"h-4 w-4"} color="currentColor" strokeWidth={2} fill={i < Math.round(count) ? "currentColor" : "none"} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <a href="#top" className="font-semibold story-link">AI & IT Store</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#products" className="hover:text-foreground story-link">Products</a>
            <a href="#reviews" className="hover:text-foreground story-link">Reviews</a>
            <a href="#contact" className="hover:text-foreground story-link">Contact</a>
          </nav>
          <Button size="sm" className="hover-scale">Get Started</Button>
        </div>
      </header>

      <main id="top">
        {/* Top Banner / Hero */}
        <section aria-label="Hero banner" className="border-b bg-muted/40">
          <div className="container grid items-center gap-8 py-16 md:grid-cols-2">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                AI & IT Store: Build Faster with Trusted Tools
              </h1>
              <p className="text-muted-foreground text-lg">
                Curated AI and developer products with transparent pricing, honest reviews, and great support.
              </p>
              <div className="flex gap-3">
                <Button className="hover-scale">Shop Featured</Button>
                <Button variant="outline" className="hover-scale" asChild>
                  <a href="#products">Browse All</a>
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <AspectRatio ratio={16 / 9}>
                <img
                  src="/placeholder.svg"
                  alt="AI & IT product showcase banner"
                  loading="eager"
                  className="h-full w-full rounded-md object-cover border"
                />
              </AspectRatio>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="container py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Featured Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <article key={p.id} className="animate-fade-in">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <h3 className="font-medium leading-none">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={p.image}
                        alt={`${p.name} product image`}
                        loading="lazy"
                        className="h-full w-full rounded-md object-cover border"
                      />
                    </AspectRatio>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">${p.price}/mo</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {renderStars(p.rating)}
                        <span>({p.reviews})</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto flex gap-2">
                    <Button className="flex-1">Add to Cart</Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a href="#contact">Contact Sales</a>
                    </Button>
                  </CardFooter>
                </Card>
              </article>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="border-t bg-muted/30">
          <div className="container py-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">What Customers Say</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((r, idx) => (
                <article key={idx} className="animate-fade-in">
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      {renderStars(r.rating)}
                      <p className="text-muted-foreground">“{r.text}”</p>
                      <p className="text-sm">— {r.name}, {r.role}</p>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact Us</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Questions about pricing, implementation, or enterprise features? Send us a message and we’ll respond within 1 business day.
          </p>
          <form onSubmit={onSubmit} className="grid gap-4 md:max-w-2xl">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm">Name</label>
              <Input id="name" name="name" placeholder="Your full name" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm">Message</label>
              <Textarea id="message" name="message" placeholder="Tell us what you need…" required rows={5} />
            </div>
            <div>
              <Button type="submit" className="hover-scale">Send Message</Button>
            </div>
          </form>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} AI & IT Store. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <a href="#products" className="hover:text-foreground">Products</a>
            <a href="#reviews" className="hover:text-foreground">Reviews</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
