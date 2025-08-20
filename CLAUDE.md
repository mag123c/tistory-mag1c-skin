# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a custom Tistory blog skin with a modern, responsive design focused on readability and user experience. The skin features a pastel color scheme optimized for eye comfort.

## Architecture

### Core Files

- **skin.html**: Main template file using Tistory replacement tags (치환자)
  - Contains conditional blocks for different page types (list, article, guestbook)
  - Uses Tistory-specific tags like `[##_variable_##]` for dynamic content
  - Structured with sidebar, main content area, and floating buttons

- **style.css**: Complete styling with Korean comments
  - ~1900 lines of CSS with pastel color variables
  - Responsive design with mobile breakpoints at 768px and 1200px
  - List view and grid view layouts for posts
  - Custom styling for comments, guestbook, and admin controls

- **script.js**: Client-side functionality
  - Hero carousel generation for homepage (detects `tt-body-index`)
  - View toggle between list and grid layouts
  - Mobile menu and search modal controls
  - Dynamic content formatting for dates and post cards

- **index.xml**: Skin configuration
  - Defines skin metadata and default values
  - Contains user-configurable variables for SNS links
  - Sets display options like `showListOnHome: 0` for list-only view

## Tistory-Specific Patterns

### Replacement Tags (치환자)
- `[##_title_##]`: Blog title
- `[##_blogger_##]`: Blog owner name
- `[##_desc_##]`: Blog description
- `[##_var_footer-sns-*_##]`: Custom variables for SNS links
- `[##_list_rep_*_##]`: List page variables
- `[##_article_rep_*_##]`: Article page variables

### Conditional Blocks
- `<s_list>`: List page wrapper
- `<s_article_rep>`: Article page wrapper
- `<s_guest>`: Guestbook page wrapper
- `<s_search>`: Search functionality wrapper
- `<s_if_var_*>`: Conditional display based on variables
- `<s_sidebar_element>`: Sidebar module wrapper

### Body Classes
- `tt-body-index`: Homepage detection
- `tt-body-search`: Search results page
- `tt-body-category`: Category page
- `tt-body-guestbook`: Guestbook page

## Common Tasks

### Testing Locally
- Upload files to Tistory Admin → Skin Edit → HTML/CSS/Upload
- Preview changes using Tistory's preview feature
- Check responsive design at mobile breakpoints (768px)

### Adding SNS Links
1. Add variable definition in `index.xml`:
```xml
<variable>
    <name>footer-sns-[platform]</name>
    <label><![CDATA[ [Platform] URL ]]></label>
    <type>STRING</type>
    <default />
</variable>
```
2. Use conditional display in `skin.html`:
```html
<s_if_var_footer-sns-[platform]>
    <a href="[##_var_footer-sns-[platform]_##]">...</a>
</s_if_var_footer-sns-[platform]>
```

### Modifying Layouts
- List/Grid toggle: Controlled by `.post-grid.list-view` class
- Carousel slides: Generated dynamically from first 5 posts in `script.js`
- Sidebar categories: Uses Tistory's `[##_category_list_##]` with custom styling

## Style Conventions

### Color Variables
```css
--primary-color: #4A90E2;  /* Blue accents */
--accent-color: #5BA3F5;   /* Hover states */
--pastel-*: /* Various pastel colors for backgrounds */
```

### Layout Patterns
- Max content width: 1400px
- Standard padding: 20px (mobile), 40px (desktop)
- Border radius: 12px for cards, 8px for buttons
- Transitions: 0.3s ease for hover effects

### Comments
- All comments should be in Korean
- CSS sections marked with `/* 섹션명 */`
- Descriptive comments for complex functionality

## Important Notes

1. **No Package Manager**: This is a static skin without Node.js dependencies
2. **Tistory Upload**: Changes must be uploaded through Tistory Admin interface
3. **Browser Compatibility**: Test in Chrome, Safari, Firefox for Tistory users
4. **Mobile First**: Ensure all features work on mobile devices
5. **Character Limits**: Carousel excerpts limited to 100 characters
6. **Admin Controls**: Only visible to blog owner when logged in

## File Size Considerations
- Keep style.css under 2MB for Tistory upload limits
- Optimize images to preview sizes (256px, 560px, 1600px)
- Minimize inline JavaScript where possible