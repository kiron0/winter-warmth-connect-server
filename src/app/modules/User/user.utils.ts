export const generateRandomAvatar = (name: string) => {
          const nameArr = name.split(' ');

          const finalName = nameArr.length > 1 ? nameArr.join('+') : name;

          const color = generateRandomColor() || 'D70040';

          const url = `https://ui-avatars.com/api/?background=${color}&color=fff&font-size=0.33&size=512&length=3&bold=true&name=${finalName}`;

          return url;
};

const generateRandomColor = () => {
          return `${Math.floor(Math.random() * 16777215).toString(16)}`;
};