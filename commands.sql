
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);


insert into blogs (author, url, title) values ('Michael Chan', 'https://reactpatterns.com/', 'React patterns');
insert into blogs (author, url, title, likes) values ('Edsger W. Dijkstra', 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 'Go To Statement Considered Harmful', 5);

select * from blogs;

