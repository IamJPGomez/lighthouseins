#!/usr/bin/env python3
"""
Backend API Testing for Lighthouse Insurance
Tests all endpoints using the public URL
"""
import requests
import sys
from datetime import datetime

BASE_URL = "https://trucking-agency-v2.preview.emergentagent.com/api"
ADMIN_PASSWORD = "Lighthouse2026!"

class LighthouseAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log(self, emoji, message):
        """Print formatted log message"""
        print(f"{emoji} {message}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        req_headers = {'Content-Type': 'application/json'}
        if headers:
            req_headers.update(headers)
        if self.token and 'Authorization' not in req_headers:
            req_headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        self.log("🔍", f"Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=req_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=req_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=req_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=req_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                self.log("✅", f"PASSED - Status: {response.status_code}")
                try:
                    return True, response.json()
                except:
                    return True, {}
            else:
                self.log("❌", f"FAILED - Expected {expected_status}, got {response.status_code}")
                self.log("📄", f"Response: {response.text[:200]}")
                self.failed_tests.append(f"{name}: Expected {expected_status}, got {response.status_code}")
                return False, {}

        except requests.exceptions.Timeout:
            self.log("❌", f"FAILED - Request timeout")
            self.failed_tests.append(f"{name}: Timeout")
            return False, {}
        except Exception as e:
            self.log("❌", f"FAILED - Error: {str(e)}")
            self.failed_tests.append(f"{name}: {str(e)}")
            return False, {}

    def test_health(self):
        """Test health endpoint"""
        self.log("🏥", "\n=== Testing Health Endpoint ===")
        success, response = self.run_test(
            "Health Check",
            "GET",
            "",
            200
        )
        if success and response.get('message'):
            self.log("✅", f"Health message: {response['message']}")
        return success

    def test_public_posts(self):
        """Test public blog posts listing"""
        self.log("📝", "\n=== Testing Public Blog Posts ===")
        success, response = self.run_test(
            "List Published Posts",
            "GET",
            "posts",
            200
        )
        if success:
            posts = response if isinstance(response, list) else []
            self.log("✅", f"Found {len(posts)} published posts")
            if len(posts) >= 4:
                self.log("✅", "At least 4 seeded posts present")
                # Verify content field is NOT in list view
                if posts and 'content' not in posts[0]:
                    self.log("✅", "Content field correctly excluded from list view")
                else:
                    self.log("⚠️", "Warning: Content field present in list view (should be excluded)")
            else:
                self.log("❌", f"Expected at least 4 posts, found {len(posts)}")
                self.failed_tests.append(f"List Posts: Expected >=4 posts, found {len(posts)}")
        return success

    def test_single_post(self):
        """Test getting a single post with FAQs"""
        self.log("📄", "\n=== Testing Single Post Retrieval ===")
        slug = "how-much-does-trucking-insurance-cost-florida-2026"
        success, response = self.run_test(
            f"Get Post: {slug}",
            "GET",
            f"posts/{slug}",
            200
        )
        if success:
            if 'content' in response:
                self.log("✅", "Content field present in single post view")
            else:
                self.log("❌", "Content field missing in single post")
                self.failed_tests.append("Single Post: Missing content field")
            
            if 'faqs' in response and len(response['faqs']) > 0:
                self.log("✅", f"FAQs present: {len(response['faqs'])} items")
            else:
                self.log("❌", "FAQs missing or empty")
                self.failed_tests.append("Single Post: Missing FAQs")
        return success

    def test_admin_login(self):
        """Test admin login with correct and wrong password"""
        self.log("🔐", "\n=== Testing Admin Login ===")
        
        # Test wrong password
        success_wrong, _ = self.run_test(
            "Admin Login (Wrong Password)",
            "POST",
            "admin/login",
            401,
            data={"password": "WrongPassword123"}
        )
        
        # Test correct password
        success_correct, response = self.run_test(
            "Admin Login (Correct Password)",
            "POST",
            "admin/login",
            200,
            data={"password": ADMIN_PASSWORD}
        )
        
        if success_correct and 'token' in response:
            self.token = response['token']
            self.log("✅", "Token received and stored")
            return True
        else:
            self.log("❌", "Failed to get token from login")
            self.failed_tests.append("Admin Login: No token received")
            return False

    def test_admin_crud(self):
        """Test admin CRUD operations"""
        self.log("🔧", "\n=== Testing Admin CRUD Operations ===")
        
        if not self.token:
            self.log("❌", "No admin token available, skipping CRUD tests")
            return False

        # Test GET /admin/posts (list all posts)
        success_list, posts = self.run_test(
            "Admin List All Posts",
            "GET",
            "admin/posts",
            200
        )
        if success_list:
            self.log("✅", f"Admin can list posts: {len(posts) if isinstance(posts, list) else 0} posts")

        # Test POST /admin/posts (create new post)
        new_post_data = {
            "title": "Test Post from API Test",
            "excerpt": "This is a test post created during API testing",
            "content": "# Test Content\n\nThis is test content.",
            "author": "Test Author",
            "tags": ["Test"],
            "status": "published",
            "seoTitle": "Test Post SEO Title",
            "seoDescription": "Test post SEO description",
            "faqs": [
                {"question": "Test question?", "answer": "Test answer."}
            ]
        }
        success_create, created_post = self.run_test(
            "Admin Create Post",
            "POST",
            "admin/posts",
            200,
            data=new_post_data
        )
        
        post_id = None
        if success_create and created_post.get('id'):
            post_id = created_post['id']
            self.log("✅", f"Post created with ID: {post_id}")
        else:
            self.log("❌", "Failed to create post or get post ID")
            return False

        # Test PUT /admin/posts/{id} (update post)
        update_data = {
            **new_post_data,
            "title": "Updated Test Post Title"
        }
        success_update, updated_post = self.run_test(
            "Admin Update Post",
            "PUT",
            f"admin/posts/{post_id}",
            200,
            data=update_data
        )
        if success_update:
            self.log("✅", "Post updated successfully")

        # Test DELETE /admin/posts/{id}
        success_delete, _ = self.run_test(
            "Admin Delete Post",
            "DELETE",
            f"admin/posts/{post_id}",
            200
        )
        if success_delete:
            self.log("✅", "Post deleted successfully")

        # Test unauthorized access (without token)
        old_token = self.token
        self.token = None
        success_unauth, _ = self.run_test(
            "Admin Endpoint Without Token (should fail)",
            "GET",
            "admin/posts",
            401
        )
        self.token = old_token
        
        if success_unauth:
            self.log("✅", "Unauthorized access correctly blocked")

        return success_list and success_create and success_update and success_delete and success_unauth

    def test_contact_form(self):
        """Test contact form submission"""
        self.log("📧", "\n=== Testing Contact Form ===")
        contact_data = {
            "name": "Test User",
            "phone": "(954) 555-0100",
            "email": "test@example.com",
            "insuranceType": "Trucking",
            "zip": "33351",
            "message": "This is a test contact form submission"
        }
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=contact_data
        )
        if success and response.get('ok'):
            self.log("✅", f"Contact form submitted: {response.get('message', '')}")
        return success

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"  - {test}")
        else:
            print("\n✅ All tests passed!")
        print("="*60)

def main():
    """Run all backend tests"""
    print("🚀 Starting Lighthouse Insurance Backend API Tests")
    print(f"🌐 Base URL: {BASE_URL}")
    print(f"🔑 Admin Password: {ADMIN_PASSWORD}")
    print("="*60)
    
    tester = LighthouseAPITester()
    
    # Run all tests
    tester.test_health()
    tester.test_public_posts()
    tester.test_single_post()
    tester.test_admin_login()
    tester.test_admin_crud()
    tester.test_contact_form()
    
    # Print summary
    tester.print_summary()
    
    # Return exit code
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
