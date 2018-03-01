const express = require('express')
const router = express.Router()
const md5 = require('md5')
const Token = require('./token')

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog_cms'
})
connection.connect()

const getUser = (username, cb = () => {}) => {
  const sql = 'SELECT * FROM `user` WHERE `username`=?'
  const param = {
    sql,
    values: [username]
  }
  connection.query(param, cb)
}

const getJson = (code = '', message = '', success = false, data = []) => {
  const json = {
    code,
    message,
    success
  }

  if (data) {
    json.data = data
  }
  return json
}

const getError = (res, error) => {
  res.json(getJson('fail', 'fail')).end()
  throw error
}

/**
 * 注册
 */
router.post('/api/reg', (req, res) => {
  const username = req.body.email
  const password = req.body.password
  const sql = 'INSERT INTO user SET ?'
  const data = {
    username,
    password: md5(password)
  }

  getUser(username, (error, results) => {
    const row = results[0]
    if (error) {
      getError(res, error)
      // 有效用户名
    } else if (!row) {
      connection.query(sql, data, error => {
        if (error) {
          getError(res, error)
        } else {
          res.json(getJson('success', '注册成功', true)).end()
        }
      })
      // 相同用户名
    } else if (row) {
      res.json(getJson('fail', `${row.username}重复的用户名`)).end()
    }
  })
})

/**
 * 登陆
 */
router.get('/api/login', (req, res) => {
  const username = req.query.email
  const password = md5(req.query.password)

  getUser(username, (error, results) => {
    const row = results[0]
    if (error) {
      getError(res, error)
      // 没有用户
    } else if (!row) {
      res.json(getJson('user fail', '用户名无效')).end()
    } else if (row.password === password) {
      const token = Token.createToken({ iss: row.id })
      res
        .json(
          getJson('success', '登陆成功', true, [{ username, password, token }])
        )
        .end()
    } else {
      res.json(getJson('pass fail', '密码错误')).end()
    }
  })
})

/**
 * 查询分类
 */
router.get('/api/category', requireLogin, (req, res) => {
  const sql = 'SELECT * FROM category'

  connection.query(sql, (error, results) => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '查询分类成功', true, results)).end()
    }
  })
})

/**
 * 添加分类
 */
router.post('/api/category', requireLogin, (req, res) => {
  req.checkBody('name', '分类不能为空').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    return res.json(getJson('error', errors[0].msg)).end()
  }

  const name = req.body.name
  const sql = 'INSERT INTO category SET ?'
  const data = {
    name,
    created: new Date().getTime()
  }
  connection.query(sql, data, error => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '添加分类成功', true)).end()
    }
  })
})

/**
 * 修改分类
 */
router.post('/api/category/:id', requireLogin, (req, res) => {
  const id = req.param('id')
  const name = req.body.name
  req.checkBody('name', '分类不能为空').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    return res.json(getJson('error', errors[0].msg)).end()
  }

  const sql = 'UPDATE category SET name = ?, created = ? WHERE id = ?'
  const data = [name, new Date().getTime(), id]

  connection.query(sql, data, error => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '修改分类成功', true)).end()
    }
  })
})

/**
 * 文章列表
 */
router.get('/api/article', requireLogin, (req, res) => {
  const sql = 'SELECT * FROM article'

  connection.query(sql, (error, results) => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '查询文章列表成功', true, results)).end()
    }
  })
})

/**
 * 查询文章
 */
router.get('/api/article/:id', requireLogin, (req, res) => {
  const sql = 'SELECT * FROM article WHERE id = ?'
  const data = [req.param('id')]

  connection.query(sql, data, (error, results) => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '查询当前文章成功', true, results)).end()
    }
  })
})

/**
 * 查询分类文章
 */
router.get('/api/articleByCategoryId/:id', requireLogin, (req, res) => {
  const sql = 'SELECT * FROM article WHERE categoryId = ?'
  const data = [req.param('id')]

  connection.query(sql, data, (error, results) => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '查询分类文章成功', true, results)).end()
    }
  })
})

/**
 * 添加文章
 */
router.post('/api/article', requireLogin, (req, res) => {
  const title = req.body.title
  const content = req.body.content
  const categoryId = req.body.category
  const author = JSON.parse(req.headers.token).username

  req.checkBody('title', '标题不能为空').notEmpty()
  req.checkBody('content', '内容不能为空').notEmpty()
  req.checkBody('category', '分类不能为空').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    return res.json(getJson('error', errors[0].msg)).end()
  }

  const sql = 'INSERT INTO article SET ?'
  const data = {
    title,
    content,
    categoryId,
    author,
    created: new Date().getTime(),
    state: 0
  }

  connection.query(sql, data, error => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '添加文章成功', true)).end()
    }
  })
})

/**
 * 修改文章
 */
router.post('/api/article/:id', requireLogin, (req, res) => {
  const id = req.param('id')
  const title = req.body.title
  const content = req.body.content
  const categoryId = req.body.category

  req.checkBody('title', '标题不能为空').notEmpty()
  req.checkBody('content', '内容不能为空').notEmpty()
  req.checkBody('category', '分类不能为空').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    return res.json(getJson('error', errors[0].msg)).end()
  }

  const sql =
    'UPDATE article SET title = ?, content = ?, categoryId = ? WHERE id = ?'
  const data = [title, content, categoryId, id]

  connection.query(sql, data, error => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '修改文章成功', true)).end()
    }
  })
})

/**
 * 删除文章
 */
router.delete('/api/article/:id', requireLogin, (req, res) => {
  const id = req.param('id')
  const sql = 'DELETE FROM article WHERE id = ?'
  const data = [id]

  connection.query(sql, data, error => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '删除文章成功', true)).end()
    }
  })
})

/**
 * 重置密码
 */
router.post('/api/resetPassword', requireLogin, (req, res) => {
  const password = req.body.password
  const user = req.body.user

  const sql = 'UPDATE user SET password = ? WHERE username = ?'
  const data = [password, user]

  connection.query(sql, data, error => {
    if (error) {
      getError(res, error)
    } else {
      res.json(getJson('success', '修改密码成功', true)).end()
    }
  })
})

/**
 * Middleware 用户权限校验
 */
function requireLogin(req, res, next) {
  let token = req.headers.token
  if (!token) {
    return res
      .status(401)
      .json(getJson('not token', '请登陆！'))
      .end()
  }

  token = JSON.parse(token)
  const checkCurrent = Token.checkToken(token.token)
  if (checkCurrent) {
    next()
  } else {
    return res
      .status(401)
      .json(getJson('please login', '请登陆！'))
      .end()
  }
}

module.exports = router
