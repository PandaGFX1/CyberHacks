Tags: #Networking #Terminology 

Refer to: [[Protocols]] and [[Ports]] and [[OSI Model]]

- Allows for us to communicate with devices on the internet without remembering IP addresses. Translates IP addresses to domain names.
- Domain Hierarchy:
	- Reference Image: [[Pasted image 20250402111741.png|DNS Hierarchy]]
	- Top-Level Domain (TLD): Most righthand part of a domain name. Consists of Generic Top Level Domain (gTLD) and Country Code Top Level Domain (ccTLD).
		- [Full list of over 2000 TLDs](https://data.iana.org/TLD/tlds-alpha-by-domain.txt)
	- Second-Level Domain: Limited to 63 characters + the TLD and can only be a-z, 0-9 and hyphens. Cannot start or end with hyphens or have them consecutively. 
	- Subdomain: Left-hand side of the Second-Level Domain using a period to separate it. Same name creation restrictions as the Second-Level Domain. Can use multiple subdomains with periods for longer names, but length must be 253 characters or less. No limit to amount of subdomains: EX: `jupiter.servers.tryhackme.com`
- DNS Records:
	- A Record: Resolves to IPv4 Addresses.
	- AAAA Record: Resolves to IPv6 Addresses.
	- CNAME Record: Records resolve to another domain name. EX: store.tryhackme.com resolves to shops.shopify.com. Another DNS request would be made to shops.shopify.com to work out the IP address.
	- MX Record: Records resolve to the addresses of the servers that handle the email for the domain that is being queried. These records also come with a priority flag.
	- TXT Record: Free text fields where any text-based data can be stored. Common uses could be to list servers that have the authority to send an email on behalf of the domain. Also used to verify ownership of the domain name when signing up for third party services.
- DNS Request Process:
	- Reference Image: [[Pasted image 20250402123037.png|DNS Request Process]]
	- All DNS records come with a TTL value. The TTL value is represented in seconds that the response should be cached.
	- When you request a domain, your computer checks its local cache to see if you've previously looked up the address recently. If not, a request is made to your Recursive DNS server.
		- A Recursive DNS server is usually provided by your ISP, but you can also choose your own. This server holds a local cache of recently looked up domain names. Common for popular and heavily requested services/domains.
	- If a request cannot be found on the Recursive DNS server then a request is sent to the internet's Root DNS servers.
		- Act as the DNS backbone of the internet. Root servers redirect you to the correct Top Level Domain Server. If you type `.com` the root server recognizes this and will refer you to the correct TLD server that deal with `.com` addresses.
	- From being forwarded to a TLD server (see above), you will then be forwarded to an authoritative DNS server.
		- An authoritative DNS server is also known as the nameserver for a domain. You'll often find multiple nameservers for a domain name. EX: `kip.ns.cloudflare.com` and `uma.ns.cloudflare.com`
		- Authoritative DNS server is responsible for storing DNS records for a particular domain name and where any updates to your domain name DNS records are made.