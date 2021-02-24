exports.login = (req, res) => {
  res.send({ message: 'Ready to fire' });
};

exports.users = (req, res) => {
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

  res.send(users);
};
