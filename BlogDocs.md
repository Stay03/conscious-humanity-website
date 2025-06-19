# Blog Feature API Documentation

## Overview
The blog feature provides a complete content management system with posts, categories, and multi-platform support. It includes public endpoints for reading content and protected endpoints for content management.

## Base URL
```
http://127.0.0.1:8000/api
```

## Authentication
Protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {your_token}
```

---

## Public Endpoints

### 1. Get Blog Categories

**Endpoint:** `GET /blog/categories`

**Description:** Retrieve all active blog categories.

**Query Parameters:**
- `platform` (optional): Filter by platform (`EL`, `CH`)

**Example Request:**
```http
GET /api/blog/categories
GET /api/blog/categories?platform=EL
```

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Technology",
      "slug": "technology-abc12",
      "description": "Latest trends and insights in technology",
      "is_active": true,
      "platform": "EL",
      "created_at": "2025-06-19T12:00:00.000000Z",
      "updated_at": "2025-06-19T12:00:00.000000Z",
      "published_posts_count": 2
    },
    {
      "id": 2,
      "name": "Education",
      "slug": "education-def34",
      "description": "Educational content and learning resources",
      "is_active": true,
      "platform": "EL",
      "created_at": "2025-06-19T12:00:00.000000Z",
      "updated_at": "2025-06-19T12:00:00.000000Z",
      "published_posts_count": 2
    }
  ]
}
```

### 2. Get Blog Posts

**Endpoint:** `GET /blog/posts`

**Description:** Retrieve published blog posts with pagination and filtering.

**Query Parameters:**
- `platform` (optional): Filter by platform (`EL`, `CH`)
- `status` (optional): Filter by status (`published`, `draft`, `archived`) - only works for authenticated admin users
- `visibility` (optional): Filter by visibility (`public`, `members_only`)
- `category_id` (optional): Filter by category ID
- `category_slug` (optional): Filter by category slug
- `featured` (optional): Filter featured posts (`1` or `true`)
- `tag` (optional): Filter by tag
- `search` (optional): Search in title, content, and excerpt
- `orderBy` (optional): Order field (default: `published_at`)
- `orderDir` (optional): Order direction (`asc`, `desc`) (default: `desc`)
- `perPage` (optional): Posts per page (default: 15)
- `include_drafts` (optional): Include draft posts (admin only)

**Example Requests:**
```http
GET /api/blog/posts
GET /api/blog/posts?platform=EL
GET /api/blog/posts?category_slug=technology-abc12
GET /api/blog/posts?featured=1
GET /api/blog/posts?search=AI
GET /api/blog/posts?tag=Education
GET /api/blog/posts?perPage=5&orderBy=title&orderDir=asc
```

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "title": "The Future of Artificial Intelligence in Education",
        "slug": "future-of-ai-in-education-xyz123",
        "content": "<p>Artificial Intelligence is revolutionizing the way we learn and teach...</p>",
        "excerpt": "Explore how AI is transforming education through personalized learning, intelligent tutoring systems, and predictive analytics.",
        "thumbnail": null,
        "author_id": 1,
        "category_id": 2,
        "status": "published",
        "visibility": "public",
        "is_featured": true,
        "tags": ["AI", "Education", "Technology", "Learning"],
        "platform": "EL",
        "published_at": "2025-06-14T12:00:00.000000Z",
        "created_at": "2025-06-19T12:00:00.000000Z",
        "updated_at": "2025-06-19T12:00:00.000000Z",
        "author": {
          "id": 1,
          "name": "Admin User",
          "email": "admin@example.com"
        },
        "category": {
          "id": 2,
          "name": "Education",
          "slug": "education-def34"
        }
      },
      {
        "id": 2,
        "title": "Building Effective Online Learning Communities",
        "slug": "building-online-learning-communities-abc789",
        "content": "<p>Creating engaging online learning communities requires careful planning...</p>",
        "excerpt": "Learn how to create engaging online learning communities that foster collaboration and knowledge sharing.",
        "thumbnail": null,
        "author_id": 1,
        "category_id": 2,
        "status": "published",
        "visibility": "public",
        "is_featured": false,
        "tags": ["Online Learning", "Community Building", "Education"],
        "platform": "EL",
        "published_at": "2025-06-09T12:00:00.000000Z",
        "created_at": "2025-06-19T12:00:00.000000Z",
        "updated_at": "2025-06-19T12:00:00.000000Z",
        "author": {
          "id": 1,
          "name": "Admin User",
          "email": "admin@example.com"
        },
        "category": {
          "id": 2,
          "name": "Education",
          "slug": "education-def34"
        }
      }
    ],
    "first_page_url": "http://127.0.0.1:8000/api/blog/posts?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://127.0.0.1:8000/api/blog/posts?page=1",
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "http://127.0.0.1:8000/api/blog/posts?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "next_page_url": null,
    "path": "http://127.0.0.1:8000/api/blog/posts",
    "per_page": 15,
    "prev_page_url": null,
    "to": 4,
    "total": 4
  }
}
```

### 3. Get Single Blog Post

**Endpoint:** `GET /blog/posts/{idOrSlug}`

**Description:** Retrieve a single blog post by ID or slug.

**Parameters:**
- `idOrSlug`: Post ID (number) or slug (string)

**Example Requests:**
```http
GET /api/blog/posts/1
GET /api/blog/posts/future-of-ai-in-education-xyz123
```

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "The Future of Artificial Intelligence in Education",
    "slug": "future-of-ai-in-education-xyz123",
    "content": "<p>Artificial Intelligence is revolutionizing the way we learn and teach. From personalized learning experiences to automated grading systems, AI is transforming education at every level.</p><p>In this comprehensive guide, we explore how AI technologies are being integrated into modern educational systems and what this means for students, teachers, and institutions.</p><p>Key areas where AI is making an impact include:</p><ul><li>Personalized learning paths</li><li>Intelligent tutoring systems</li><li>Automated content creation</li><li>Predictive analytics for student success</li></ul>",
    "excerpt": "Explore how AI is transforming education through personalized learning, intelligent tutoring systems, and predictive analytics.",
    "thumbnail": null,
    "author_id": 1,
    "category_id": 2,
    "status": "published",
    "visibility": "public",
    "is_featured": true,
    "tags": ["AI", "Education", "Technology", "Learning"],
    "platform": "EL",
    "published_at": "2025-06-14T12:00:00.000000Z",
    "created_at": "2025-06-19T12:00:00.000000Z",
    "updated_at": "2025-06-19T12:00:00.000000Z",
    "author": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "category": {
      "id": 2,
      "name": "Education",
      "slug": "education-def34"
    }
  }
}
```

**Error Response (Post not found):**
```json
{
  "status": "error",
  "message": "Post not found or not published"
}
```

---

## Protected Endpoints (Admin Only)

### 4. Create Blog Post

**Endpoint:** `POST /blog/posts`

**Description:** Create a new blog post.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My New Blog Post",
  "content": "<p>This is the full content of my blog post with HTML formatting.</p>",
  "excerpt": "A brief summary of the post",
  "platform": "EL",
  "category_id": 1,
  "status": "draft",
  "visibility": "public",
  "is_featured": false,
  "tags": ["Technology", "Innovation"],
  "published_at": "2025-06-20T10:00:00Z"
}
```

**Request Body (with file upload):**
```json
{
  "title": "My New Blog Post",
  "content": "<p>This is the full content of my blog post.</p>",
  "excerpt": "A brief summary of the post",
  "platform": "EL",
  "category_id": 1,
  "thumbnail": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "status": "published",
  "visibility": "public",
  "is_featured": true,
  "tags": ["Technology", "Innovation"]
}
```

**Required Fields:**
- `title` (string, max 255 chars)
- `content` (string)
- `platform` (string: EL, CH, EL,CH, or CH,EL)

**Optional Fields:**
- `excerpt` (string, max 500 chars)
- `category_id` (integer, must exist in blog_categories)
- `thumbnail` (string: base64 image data)
- `thumbnail_file` (file: image upload, max 5MB)
- `status` (string: draft, published, archived) - default: draft
- `visibility` (string: public, members_only) - default: public
- `is_featured` (boolean) - default: false
- `tags` (array of strings, max 50 chars each)
- `published_at` (datetime ISO 8601 format)

**Example Response:**
```json
{
  "status": "success",
  "message": "Blog post created successfully",
  "data": {
    "id": 6,
    "title": "My New Blog Post",
    "slug": "my-new-blog-post-xyz789",
    "content": "<p>This is the full content of my blog post with HTML formatting.</p>",
    "excerpt": "A brief summary of the post",
    "thumbnail": null,
    "author_id": 1,
    "category_id": 1,
    "status": "draft",
    "visibility": "public",
    "is_featured": false,
    "tags": ["Technology", "Innovation"],
    "platform": "EL",
    "published_at": null,
    "created_at": "2025-06-19T12:30:00.000000Z",
    "updated_at": "2025-06-19T12:30:00.000000Z",
    "author": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "category": {
      "id": 1,
      "name": "Technology",
      "slug": "technology-abc12"
    }
  }
}
```

### 5. Update Blog Post

**Endpoint:** `PUT /blog/posts/{id}`

**Description:** Update an existing blog post.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:** (All fields optional for updates)
```json
{
  "title": "Updated Blog Post Title",
  "content": "<p>Updated content here.</p>",
  "status": "published",
  "is_featured": true,
  "published_at": "2025-06-20T10:00:00Z"
}
```

**Example Response:**
```json
{
  "status": "success",
  "message": "Blog post updated successfully",
  "data": {
    "id": 6,
    "title": "Updated Blog Post Title",
    "slug": "updated-blog-post-title-abc123",
    "content": "<p>Updated content here.</p>",
    "excerpt": "A brief summary of the post",
    "thumbnail": null,
    "author_id": 1,
    "category_id": 1,
    "status": "published",
    "visibility": "public",
    "is_featured": true,
    "tags": ["Technology", "Innovation"],
    "platform": "EL",
    "published_at": "2025-06-20T10:00:00.000000Z",
    "created_at": "2025-06-19T12:30:00.000000Z",
    "updated_at": "2025-06-19T12:35:00.000000Z",
    "author": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "category": {
      "id": 1,
      "name": "Technology",
      "slug": "technology-abc12"
    }
  }
}
```

### 6. Delete Blog Post

**Endpoint:** `DELETE /blog/posts/{id}`

**Description:** Delete a blog post permanently.

**Headers:**
```
Authorization: Bearer {token}
```

**Example Response:**
```json
{
  "status": "success",
  "message": "Blog post deleted successfully"
}
```

### 7. Toggle Blog Post Status

**Endpoint:** `PATCH /blog/posts/{id}/toggle-status`

**Description:** Toggle post status between draft and published.

**Headers:**
```
Authorization: Bearer {token}
```

**Example Response:**
```json
{
  "status": "success",
  "message": "Blog post status updated successfully",
  "data": {
    "id": 6,
    "title": "My Blog Post",
    "slug": "my-blog-post-xyz789",
    "status": "published",
    "published_at": "2025-06-19T12:40:00.000000Z",
    "updated_at": "2025-06-19T12:40:00.000000Z"
  }
}
```

### 8. Create Blog Category

**Endpoint:** `POST /blog/categories`

**Description:** Create a new blog category.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Science",
  "description": "Scientific discoveries and research",
  "platform": "EL",
  "is_active": true
}
```

**Required Fields:**
- `name` (string, max 255 chars)
- `platform` (string: EL, CH, EL,CH, or CH,EL)

**Optional Fields:**
- `description` (string)
- `is_active` (boolean) - default: true

**Example Response:**
```json
{
  "status": "success",
  "message": "Blog category created successfully",
  "data": {
    "id": 5,
    "name": "Science",
    "slug": "science-def789",
    "description": "Scientific discoveries and research",
    "is_active": true,
    "platform": "EL",
    "created_at": "2025-06-19T12:45:00.000000Z",
    "updated_at": "2025-06-19T12:45:00.000000Z"
  }
}
```

---

## Error Responses

### Validation Errors
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "title": ["The title field is required."],
    "platform": ["The platform must be EL, CH, or a combination of both."]
  }
}
```

### Authentication Errors
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

### Authorization Errors
```json
{
  "status": "error",
  "message": "You do not have permission to create blog posts"
}
```

### Not Found Errors
```json
{
  "status": "error",
  "message": "Post not found or not published"
}
```

---

## Data Models

### Blog Post Model
```typescript
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  thumbnail: string | null;
  author_id: number;
  category_id: number | null;
  status: 'draft' | 'published' | 'archived';
  visibility: 'public' | 'members_only';
  is_featured: boolean;
  tags: string[] | null;
  platform: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
}
```

### Blog Category Model
```typescript
interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  platform: string;
  created_at: string;
  updated_at: string;
  published_posts_count?: number;
}
```

---

## Implementation Notes

1. **Slugs are auto-generated** from titles with random suffixes for uniqueness
2. **Published posts only** appear in public endpoints unless user is admin
3. **Platform filtering** allows separation of content between EL and CH platforms
4. **File uploads** support both base64 strings and multipart form data
5. **Pagination** uses Laravel's standard pagination format
6. **Authentication** uses Laravel Sanctum bearer tokens
7. **Search functionality** searches across title, content, and excerpt fields
8. **Tags** are stored as JSON arrays and support filtering
9. **Timestamps** are in ISO 8601 format with timezone information
10. **Membership content** (visibility: members_only) requires user authentication to access

## Example Frontend Implementation

### Fetching Blog Posts
```javascript
const fetchBlogPosts = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/blog/posts?${params}`);
  const data = await response.json();
  return data;
};

// Usage examples
const posts = await fetchBlogPosts({ platform: 'EL', featured: 1 });
const searchResults = await fetchBlogPosts({ search: 'AI education' });
```

### Creating a Blog Post (Admin)
```javascript
const createBlogPost = async (postData, token) => {
  const response = await fetch('/api/blog/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return await response.json();
};
```