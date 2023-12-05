const express = require('express');
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(express.json())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//ソケットの設定
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'my_schema',
});

app.get("/get/user", (req, res) => {
  let _id = req.query["id"];
  const sql_select = 'SELECT * FROM users_tb WHERE id = ?';
  db.query(sql_select, [_id], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/get/subjects", (req, res) => {
  let _id = req.query["id"];
  const sql_select = 'SELECT * FROM studyrecords_tb WHERE id = ?';
  db.query(sql_select, [_id], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/get/studyrecords", (req, res) => {
  const sql_select = 'SELECT * FROM studyrecords_tb ';
  db.query(sql_select, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/get/profile", (req, res) => {
  let _id = req.query["id"];
  const sql_select = 'SELECT * FROM profiles_tb WHERE id = ?';
  db.query(sql_select, [_id], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/get/rank", (req, res) => {
  let _id = req.query["id"];
  const sql_select = 'SELECT * FROM ranking_tb WHERE id = ?';
  db.query(sql_select, [_id], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/get/ranking", (req, res) => {
  const sql_select = 'SELECT * FROM ranking_tb';
  db.query(sql_select, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/get/studyrooms/seats", (req, res) => {
  const sql_select = 'SELECT * FROM studyrooms_tb';
  db.query(sql_select, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/get/ranking/top10", (req, res) => {
  const sql_select = 'SELECT * FROM ranking_tb ORDER BY total_time DESC LIMIT 0, 10 ';
  db.query(sql_select, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.put('/update/studrecord', (req, res) => {
  const _id = req.body._id;
  const _subjects = req.body.subject_names_list;
  const _times = req.body.subject_times_list;
  const sql_update = 'UPDATE studyrecords_tb SET subjects = ? , times = ? WHERE id = ?';
  db.query(sql_update, [_subjects, _times, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/update/rank', (req, res) => {
  const _id = req.body._id;
  const _total_time = req.body._total_time;
  const sql_update = 'UPDATE ranking_tb SET total_time = ?  WHERE id = ?';

  db.query(sql_update, [_total_time, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/update/profile', (req, res) => {

  const sql_update = `UPDATE profiles_tb SET introduction = ?, goal = ?,  monthly_goal = ? WHERE id= ?`;

  const _id = req.body._id;
  const _introduction = req.body._introduction;
  const _goal = req.body._goal;
  const _monthly_goal = req.body._total_time;

  db.query(sql_update, [_id, _introduction, _goal, _monthly_goal], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/update/studyroom', (req, res) => {

  const _user_id = req.body._id;
  const _room_num = req.body._room_num;
  const _seat_num = req.body.__seat_num;

  if (_seat_num == 1) {
    db.query('UPDATE studyrooms_tb SET seat1 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 2) {
    db.query('UPDATE studyrooms_tb SET seat2 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });

  } else if (_seat_num == 3) {
    db.query('UPDATE studyrooms_tb SET seat3 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });

  } else if (_seat_num == 4) {
    db.query('UPDATE studyrooms_tb SET seat4 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });

  } else if (_seat_num == 5) {
    db.query('UPDATE studyrooms_tb SET seat5 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 6) {
    db.query('UPDATE studyrooms_tb SET seat6 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 7) {
    db.query('UPDATE studyrooms_tb SET seat7 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 8) {
    db.query('UPDATE studyrooms_tb SET seat8 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 9) {
    db.query('UPDATE studyrooms_tb SET seat9 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 10) {
    db.query('UPDATE studyrooms_tb SET seat10 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  }

});

app.put('/update/user/seat', (req, res) => {
  const sql_update = 'UPDATE users_tb SET is_seated = ? WHERE id = ?';
  const _id = req.body._id
  const _is_seated = req.body._is_seated
  db.query(sql_update, [_is_seated, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//空席情報の更新
app.put('/update/vacantseat', (req, res) => {

  const _user_id = -1;
  const _room_num = req.body._room_num;
  const _seat_num = req.body._seat_num;

  if (_seat_num == 1) {
    db.query('UPDATE studyrooms_tb SET seat1 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 2) {
    db.query('UPDATE studyrooms_tb SET seat2 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });

  } else if (_seat_num == 3) {
    db.query('UPDATE studyrooms_tb SET seat3 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });

  } else if (_seat_num == 4) {
    db.query('UPDATE studyrooms_tb SET seat4 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });

  } else if (_seat_num == 5) {
    db.query('UPDATE studyrooms_tb SET seat5 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  }
  else if (_seat_num == 6) {
    db.query('UPDATE studyrooms_tb SET seat6 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 7) {
    db.query('UPDATE studyrooms_tb SET seat7 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 8) {
    db.query('UPDATE studyrooms_tb SET seat8 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 9) {
    db.query('UPDATE studyrooms_tb SET seat9 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  } else if (_seat_num == 10) {
    db.query('UPDATE studyrooms_tb SET seat10 = ?  WHERE id = ?', [_user_id, _room_num], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  }
});

app.put('/update/subjects', (req, res) => {
  const _id = req.body._id;
  const _subjects_names = req.body._subjects_names;
console.log("_subjects_names")
console.log(_subjects_names)
  const sql_update = 'UPDATE studyrecords_tb SET subjects = ?  WHERE id = ?';
  db.query(sql_update, [_subjects_names, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/update/times', (req, res) => {
  const _id = req.body._id;
  const _subjects_times = req.body._subjects_times;
  const sql_update = 'UPDATE studyrecords_tb SET times = ?  WHERE id = ?';
  db.query(sql_update, [_subjects_times, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


app.put('/edit/account/email', (req, res) => {

  const _id = req.body._id;
  const _email = req.body._email;
  const sql_edit = 'UPDATE users_tb SET email = ? WHERE id = ?';
  db.query(sql_edit, [_email, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });

});

app.put('/edit/account/password', (req, res) => {

  const _id = req.body._id;
  const _password = req.body._password;
  const sql_edit = 'UPDATE users_tb SET password = ? WHERE id = ?';

  db.query(sql_edit, [_password, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/edit/account/name', (req, res) => {

  const _id = req.body._id;
  const _name = req.body._name;
  const sql_edit = 'UPDATE users_tb SET password = ? WHERE id = ?';

  db.query(sql_edit, [_name, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/update/ranking/name', (req, res) => {

  const _id = req.body._id;
  const _name = req.body._name;
  const sql_edit = 'UPDATE ranking_tb SET name = ? WHERE id = ?';

  db.query(sql_edit, [_name, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/subject/add', async (req, res) => {

  const _id = req.query["id"];
  const _subjects = req.query["subjects"];
  const _times = req.query["times"];

  const sql_add = 'UPDATE studyrecords_tb SET subjects = ?,times = ? WHERE id = ?';

  db.query(sql_add, [_subjects, _times, _id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});



app.get("/login", async (req, res) => {

  let _email = req.query["email"];
  let _password = req.query["password"];
  const sql_select = 'SELECT * FROM users_tb WHERE email = ? AND password = ?';

  db.query(sql_select, [_email, _password],
    (err, result) => {
      if (result[0] == null) {
        return res.json("ログインに失敗");
      } else {
        let _id = result[0].id
        console.log("ログインに成功したよ");
        //jwtの認証処理
        const payload = {
          id: _id,
          email: _email,
          password: _password,
        };
        const option = {
          expiresIn: '10m'
        }
        const token = jwt.sign(payload, "asdwsda", option);
        console.log(token)

        res.cookie("jwt", token);
        return res.json("sucsees");
      }
    });
});

app.get("/register", async (req, res) => {

  const _email = req.query["email"];
  const _password = req.query["password"];
  const _name = req.query["name"];
  const _init = "未設定";
  const _init_num = "0";
  const _init_is_seated = false

  const sql_select = 'SELECT * FROM users_tb WHERE email = ?';

  db.query(sql_select, _email,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);

      if (result[0] != null) {
        console.log("データが存在")
        return res.json("fail");
      }
      res.send(result);
      if (result[0] == null) {
        console.log("追加します");
        //dbのテーブルの名前変更する必要ある複数形とか

        const sql_insert_user_table = "INSERT INTO users_tb (email,password,name,last_login_time,is_seated) VALUES (?,?,?,?,?)";
        const sql_insert_smaplestudy_record = "INSERT INTO studyrecords_tb (subjects,times) VALUES (?,?)";
        const sql_insert_profile_table = "INSERT INTO profiles_tb (introduction,goal,monthly_goal) VALUES (?,?,?)";
        const sql_Insert_ranking_tb = "INSERT INTO ranking_tb (name,total_time) VALUES (?,?)";

        db.query(sql_insert_user_table, [_email, _password, _name, _init_num, _init_is_seated], (err, result) => {
          console.log(result);
        });
        db.query(sql_insert_smaplestudy_record, [_init, _init_num], (err, result) => {
          console.log(result);
        });
        db.query(sql_insert_profile_table, [_init, _init, _init], (err, result) => {
          console.log(result);
        });
        db.query(sql_Insert_ranking_tb, [_name, _init_num], (err, result) => {
          console.log(result);
        });
      }
    });
});

app.put('/add/contact', (req, res) => {
  const _id = req.body._id;
  const _content = req.body._content;
  
  const sql_insert = 'INSERT INTO contacts_tb (_user_id, content) VALUES (?, ?)'

  db.query(sql_insert, [_content,_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


app.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.send('クッキーを削除します');
});


//jwtを取得する
app.get('/getjwt', (req, res) => {
  if (JSON.stringify(req.cookies) == "{}") {
    return res.json("fail");
  } else {
    res.send(req.cookies);
  }
});

//ソケットで席の状態を更新
io.on("connection", (socket) => {
  socket.on("update_seat", (data) => {
    console.log("socket");
    console.log(data);
    io.emit("received_update_seat", data);
  });
  socket.on("update_vacant_seat", (data) => {
    console.log("socket");
    console.log(data);
    io.emit("received_update_vacant_seat", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

});

server.listen(3001, () => {
  console.log("サーバー起動");
});