import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { footer } from "@/data/footer";
import { site } from "@/data/site";

const linkClass = "rounded-sm transition-colors hover:text-primary";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-28 bg-primary/4 pt-14 pb-7">
      <Container className="flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-2 xl:flex xl:w-302.25 xl:-ml-0.25 xl:gap-32.5">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <a href="#home" className="flex items-center gap-2 self-start rounded-full" aria-label={`${site.name} — back to top`}>
                <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} />
                <span className="font-heading text-h5 font-semibold text-white uppercase">{site.name}</span>
              </a>
              <p className="text-body-lg text-white/88 xl:w-85">{footer.description}</p>
            </div>
            <ul className="flex gap-5">
              {footer.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${social.label}`}
                    className="block rounded-full transition-opacity hover:opacity-70"
                  >
                    <Image src={social.icon} alt="" width={32} height={32} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-6">
              <h2 className="text-footer-heading font-bold text-white">{column.heading}</h2>
              <ul className="flex flex-col gap-4 text-body-lg whitespace-nowrap text-white/80">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-6">
            <h2 className="text-footer-heading font-bold text-white">{footer.contact.heading}</h2>
            <address className="flex flex-col gap-4 text-body-lg text-white/72 not-italic">
              {footer.contact.items.map((item) =>
                item.kind === "address" ? (
                  <a
                    key={item.kind}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 ${linkClass}`}
                  >
                    <Image src={item.icon} alt="" width={24} height={24} />
                    <span className="sr-only">Open address in Google Maps: </span>
                    <span>
                      {item.lines?.map((line) => (
                        <span key={line} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                ) : (
                  <a key={item.kind} href={item.href} className={`flex items-start gap-3.5 ${linkClass}`}>
                    <Image src={item.icon} alt="" width={24} height={24} className="mt-0.75 -ml-0.5" />
                    <span className="sr-only">{item.kind === "phone" ? "Call" : "Email"}: </span>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </a>
                ),
              )}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:pl-1.25">
          <Image src="/decor/footer-line.svg" alt="" width={1200} height={1} className="h-px w-full" />
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-body-lg text-white/80">
            <p>
              © {year} {site.name}
            </p>
            <p>
              {footer.legal.map((link, i) => (
                <span key={link.label}>
                  {i > 0 ? " | " : null}
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
