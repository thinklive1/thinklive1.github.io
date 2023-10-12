// 导入塔罗牌数据
import tarotData from './tarotData.json'; 

// 获取随机塔罗牌
function getRandomTarot() {
  const randomIndex = Math.floor(Math.random() * tarotData.length);
  return tarotData[randomIndex];
}

// 使用示例
const randomTarot = getRandomTarot();

return (
  <div>
    <img src={`/images/tarot/${randomTarot.name}.jpg`} />
    <h3>{randomTarot.name}</h3>
    <p>{randomTarot.desc}</p>
  </div>
);