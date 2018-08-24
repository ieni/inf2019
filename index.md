---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

Het nieuwe examenprogramma voor het HAVO/VWO-vak informatica gaat in per september 2019.
Momenteel wordt er hard gewerkt aan het ontwikkelen van lesmateriaal hiervoor.
De verschillende methodes zorgen voor het materiaal voor het verplichte deel van het programma.
In opdracht van SLO werken de informatica-steunpunten samen met docententeams aan het materiaal voor de keuzethema's.

Deze website geeft toegang tot het materiaal voor de keuzethema's.
Het materiaal wordt het komende schooljaar (2018-2019) getest.
Dit testen gebeurt eerst binnen de ontwikkelteams, daarna door docenten die hiermee in een vroeg stadium aan de slag willen.

## Informatica-keuzethema's

* [Databases]({{ site.bseurl }}/databases.html)
* [Netwerken-Internet of Things]({{ site.baseurl}}/netwerken.html)
* [Physical computing]({{ site.baseurl }}/physical-computing)
* [Scientific computing: Agent based modeling]({{ site.baseurl }}/scientific-computing)


## Nieuws

<div>
{%- if site.posts.size > 0 -%}
  <ul class="post-list">
    {%- for post in site.posts -%}
    <li>
      <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
      </a>
      {%- assign date_format = site.minima.date_format | default: "%-d-%b-%Y" -%}
      <span class="post-meta">({{ post.date | date: date_format }})</span>
      {%- if site.show_excerpts -%}
        {{ post.excerpt }}
      {%- endif -%}
    </li>
    {%- endfor -%}
  </ul>

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a></p>
{%- endif -%}
</div>

## Agenda

<div class="agenda-list">
  <ul>
    {% for post in site.categories["agenda"] %}
      <h4><a href="{{ site.baseurl }}{{ post.url }}">{{post.agendadate}} - {{post.title}}</a></h4>
    {% endfor %}
  </ul>
</div>