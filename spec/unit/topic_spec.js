const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Coding languages",
                description: "Languages in Javascript"
            })
            .then((topic) => {
                this.topic = topic;
                Post.create({
                    title:"Javascript",
                    body: "Front end web dev",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
    describe("#create()", () => {
        it("should create a topic with a title and description", (done) => {
            Topic.create({
                title: "Node JS",
                description: "Thread for NodeJS discussion"
            })
            .then((topic) => {
                expect(topic.title).toBe("Node JS");
                expect(topic.description).toBe("Thread for NodeJS discussion");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
        it("should not create a topic with missing title or description", (done) => {
            Topic.create({
                title: "Node JS"
            })
            .then((topic) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.description cannot be null");
                done();
            })
        });
    });
    describe("#getPosts()", () => {
        it("should return an array of posts associated with a specific topic", (done) => {
            this.topic.getPosts()
            .then((posts) => {
                expect(posts[0].title);
                done();
            });
        });
    });
});