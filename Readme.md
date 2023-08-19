```:json
{
  "name": "mermaid-extension",
  "description": "マーメイドの図を表示させる",
  "version": "1.0.0",
  "manifest_version": 3,
  "action": {
    "default_popup": "js/popup.html"
  },
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*", "file:///*"],
      "js": ["js/content.js"]
    }
  ],
  "background": {
    "service_worker": "js/background.js"
  },
  "web_accessible_resources": [
    {
      "resources": ["js/popup.html"],
      "matches": ["http://*/*", "https://*/*", "file:///*"]
    }
  ],
  "permissions": ["tabs"]
}

```