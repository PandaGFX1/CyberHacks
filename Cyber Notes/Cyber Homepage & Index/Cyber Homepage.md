---
banner: https://i.pinimg.com/1200x/50/df/2a/50df2a87e9383eb90312eb202eee169b.jpg
icon: https://imgs.search.brave.com/7cdKJiM8jJNcG_9LUDi1Me4PKLaFi04QvjKDkO1Nf84/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGVw/aWN0dXJlc2RwLmlu/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI1/LzA4L2JveXMtcHJv/ZmlsZS1waWMtZG93/bmxvYWQuanBn
---

```search-bar
show recent files
```
***

> [!dashboard] Dashboard
> > [!stats] 
> > > [!stat] Knowledge
> > > ```dataviewjs  
> > > dv.paragraph(dv.pages('"03 - Cyber Notes/01 - Knowledge"').length)  
> > > ```
> > 
> > > [!stat] Techniques
> > > ```dataviewjs
> > > dv.paragraph(dv.pages('"03 - Cyber Notes/02 - Techniques"').length)
> > > ```
> > 
> > > [!stat] Playbooks
> > > ```dataviewjs
> > > dv.paragraph(dv.pages('"03 - Cyber Notes/03 - Playbooks"').length)
> > > ```
> > 
> > > [!stat] Tools
> > > ```dataviewjs
> > > dv.paragraph(dv.pages('"03 - Cyber Notes/04 - Tools"').length)
> > > ```
>
> > [!main]
> > >[!left-column,]
> > > >[!box]+ Jump to Notes
> > > > [[Knowledge]]
> > > > [[Techniques]]
> > > > [[Playbooks]]
> > > > [[Tools]]
> > > > [[Labs]]
> > > > [[Cyber Resources]]
> > > > [[Projects]]
> > >
> > > > [!box]+ Links
> > > > [HackTheBox](https://www.hackthebox.com)
> > > > [TryHackMe](https://www.tryhackme.com)
> > > > [Useful Github](https://www.github.com)
> > > > ###
> > > > ###
> > > >   
> > 
> > > [!right-column]
> > > > [!box]+ Cyber Tasks 
> > > > ```tasks
> > > > not done
> > > > path includes "Cyber Notes"
> > > > limit 5
> > > > hide toolbar
> > > > 
> > > > ```
> > > > ```dataview
> > > > TABLE WITHOUT ID file.link AS "Unlinked Files"
> > > > WHERE !file.inlinks
> > > > LIMIT 4
> > > > ```
> > >
> > > > [!box]+ Recently Modified
> > > > ```dataview
> > > > TABLE file.mtime AS "Modified"
> > > > FROM ""
> > > > WHERE file.name != "Home"
> > > > SORT file.mtime DESC
> > > > LIMIT 4
> > > > ```
 
*** 
<iframe src="https://jandee.vercel.app/StormBlackthorn" width="100%" height="275px"></iframe>
