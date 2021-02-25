const users = [
  {
    id: 1,
    name: 'Paul',
    old: true
  },
  {
    id: 2,
    name: 'Matthew',
    old: false
  },
  {
    id: 3,
    name: 'Kreb',
    old: false
  }
];

exports.getUsers = (req, res) => {
  res.send(users);
};

exports.getOneUser = (req, res) => {
  const { id } = req.params;
  const user = users.filter((e) => e.id === +id);
  if (user.length > 0) {
    res.send(user[0]);
  } else {
    res.status(404).send({ message: 'User does not not exist' });
  }
};

exports.createUser = (req, res) => {
  const { name, old } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Name of user not sent' });
  }
  const data = {
    id: users.length + 1,
    name,
    old
  };
  users.push(data);
  res.status(201).send({ message: 'User created successfully' });
};

exports.updateUser = (req, res) => {
  const { name, old } = req.body;
  const { id } = req.params;

  users[id] = { ...users[id], name, old };

  res.send({ message: 'User updated successfully' });
};
