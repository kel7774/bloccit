const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;
        sequelize.sync({force: true}).then((res) => {
            User.create({
                email: "starman@tesla.com",
                password: "Trekkie4lyfe"
            })
            .then((user) => {
                this.user = user;
                Topic.create({
                    title: "Expeditions to Alpha Centauri",
                    description: "A compilation of reports from recent visits to the star system.",
                    posts: [{
                        title: "My first visit to Proxima Centauri b",
                        body: "I saw some rocks.",
                        userId: this.user.id
                    }]
                }, {
                    include: {
                        model: Post,
                        as: "posts"
                    }
                })
                .then((topic) => {
                    this.topic = topic;
                    this.post = topic.posts[0];
                    done();
                })
            })
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