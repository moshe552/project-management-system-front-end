const generateRandomUsers = (count) => {
    const randomUsers = [];
    for (let i = 1; i <= count; i++) {
      randomUsers.push({
        id: i,
        name: `User${i}`,
        age: Math.floor(Math.random() * 50) + 18, // Generating random age between 18 and 67
        text: "Random text",
      });
    }
    return randomUsers;
  };
  
  const DataRandom = generateRandomUsers(50);
  
  export default DataRandom;