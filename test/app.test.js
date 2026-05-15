import request from "supertest";
import app from "../app.js";

describe("Auth Endpoints", () => {
  const testUser = {
    username: "testuser",
    email: "test@example.com",
    password: "Test1234!",
  };

  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/auth/register").send(testUser);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", testUser.email);
    });

    it("should not register duplicate email", async () => {
      await request(app).post("/auth/register").send(testUser);
      const res = await request(app).post("/auth/register").send(testUser);
      expect(res.status).toBe(400);
    });

    it("should not register with invalid email", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testuser2",
        email: "invalid",
        password: "Test1234!",
      });
      expect(res.status).toBe(400);
    });

    it("should not register with weak password", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "testuser3",
        email: "test2@example.com",
        password: "weak",
      });
      expect(res.status).toBe(400);
    });
  });

  describe("POST /auth/login", () => {
    it("should login with correct credentials", async () => {
      const res = await request(app).post("/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should not login with wrong password", async () => {
      const res = await request(app).post("/auth/login").send({
        email: testUser.email,
        password: "wrongpassword",
      });
      expect(res.status).toBe(401);
    });

    it("should not login with non-existent email", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });
      expect(res.status).toBe(401);
    });
  });
});

describe("Task Endpoints", () => {
  let token;
  let taskId;

  beforeAll(async () => {
    const res = await request(app).post("/auth/register").send({
      username: "taskuser",
      email: "taskuser@example.com",
      password: "Test1234!",
    });
    token = res.body.token;
  });

  describe("POST /tasks", () => {
    it("should create a task", async () => {
      const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          dueDate: dueDate.toISOString(),
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("title", "Test Task");
      taskId = res.body.id;
    });

    it("should not create task without token", async () => {
      const res = await request(app).post("/tasks").send({
        title: "Test Task",
        description: "Test Description",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
      expect(res.status).toBe(401);
    });

    it("should not create task with invalid data", async () => {
      const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({});
      expect(res.status).toBe(400);
    });
  });

  describe("GET /tasks", () => {
    it("should get all user tasks", async () => {
      const res = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should not get tasks without token", async () => {
      const res = await request(app).get("/tasks");
      expect(res.status).toBe(401);
    });
  });

  describe("GET /tasks/:id", () => {
    it("should get a specific task", async () => {
      const res = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", taskId);
    });

    it("should not get non-existent task", async () => {
      const res = await request(app)
        .get("/tasks/999999")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
    });
  });

  describe("PUT /tasks/complete/:id", () => {
    it("should complete a task", async () => {
      const res = await request(app)
        .put(`/tasks/complete/${taskId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("completed", true);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      const res = await request(app)
        .delete(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("should not delete non-existent task", async () => {
      const res = await request(app)
        .delete("/tasks/999999")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
    });
  });
});

describe("Admin User Endpoints", () => {
  let adminToken;
  let userId;

  beforeAll(async () => {
    const res = await request(app).post("/auth/login").send({
      email: "admin@example.com",
      password: "Admin1234!",
    });
    adminToken = res.body.token;

    const userRes = await request(app).post("/auth/register").send({
      username: "regularuser",
      email: "regularuser@example.com",
      password: "User1234!",
    });
    userId = userRes.body.user.id;
  });

  describe("GET /users (admin)", () => {
    it("should get all users as admin", async () => {
      const res = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should not get users without admin role", async () => {
      const userRes = await request(app).post("/auth/login").send({
        email: "taskuser@example.com",
        password: "Test1234!",
      });
      const userToken = userRes.body.token;

      const res = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe("GET /users/:id (admin)", () => {
    it("should get user by id as admin", async () => {
      const res = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /users/:id (admin)", () => {
    it("should delete user as admin", async () => {
      const res = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(204);
    });
  });
});

describe("Health Check", () => {
  it("GET /health should return OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");
  });
});