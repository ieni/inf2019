---
title: Nieuws
layout: news
list_title: "nieuws"
---

## Berichten

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
