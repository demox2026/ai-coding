// 模拟餐厅数据
const RESTAURANT_DATA = [
  {
    id: 1,
    name: "海底捞火锅",
    category: "chinese",
    rating: 4.8,
    price: "medium",
    distance: 0.8,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
    address: "朝阳区三里屯太古里南区",
    phone: "010-12345678",
    hours: "10:00-22:00",
    description: "正宗四川火锅，服务贴心，环境优雅",
    dishes: ["毛肚", "鸭血", "虾滑", "牛肉片"],
    tags: ["火锅", "川菜", "聚餐", "服务好"]
  },
  {
    id: 2,
    name: "星巴克咖啡",
    category: "coffee",
    rating: 4.2,
    price: "medium",
    distance: 0.5,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
    address: "朝阳区国贸商城",
    phone: "010-87654321",
    hours: "07:00-22:00",
    description: "全球连锁咖啡品牌，提供优质咖啡和轻食",
    dishes: ["拿铁", "卡布奇诺", "星冰乐", "三明治"],
    tags: ["咖啡", "轻食", "办公", "连锁"]
  },
  {
    id: 3,
    name: "寿司大",
    category: "japanese",
    rating: 4.9,
    price: "high",
    distance: 1.2,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd1871?w=400&h=300&fit=crop",
    address: "朝阳区亮马桥外交公寓",
    phone: "010-11223344",
    hours: "11:30-14:00, 17:30-21:30",
    description: "正宗日式料理，新鲜食材，匠心制作",
    dishes: ["三文鱼刺身", "金枪鱼寿司", "天妇罗", "味噌汤"],
    tags: ["日料", "刺身", "寿司", "高端"]
  },
  {
    id: 4,
    name: "麦当劳",
    category: "western",
    rating: 4.0,
    price: "low",
    distance: 0.3,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    address: "朝阳区三里屯SOHO",
    phone: "010-55667788",
    hours: "24小时营业",
    description: "全球知名快餐品牌，快速便捷",
    dishes: ["巨无霸", "薯条", "麦乐鸡", "可乐"],
    tags: ["快餐", "汉堡", "24小时", "连锁"]
  },
  {
    id: 5,
    name: "韩式烤肉店",
    category: "korean",
    rating: 4.6,
    price: "medium",
    distance: 1.5,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
    address: "朝阳区望京SOHO",
    phone: "010-99887766",
    hours: "11:00-23:00",
    description: "正宗韩式烤肉，肉质鲜嫩，配菜丰富",
    dishes: ["五花肉", "牛里脊", "石锅拌饭", "泡菜汤"],
    tags: ["韩料", "烤肉", "聚餐", "正宗"]
  },
  {
    id: 6,
    name: "哈根达斯",
    category: "dessert",
    rating: 4.4,
    price: "high",
    distance: 0.9,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    address: "朝阳区三里屯太古里北区",
    phone: "010-33445566",
    hours: "10:00-22:00",
    description: "高端冰淇淋品牌，口感浓郁，口味丰富",
    dishes: ["香草冰淇淋", "巧克力冰淇淋", "草莓冰淇淋", "冰淇淋蛋糕"],
    tags: ["甜品", "冰淇淋", "高端", "约会"]
  },
  {
    id: 7,
    name: "全聚德烤鸭",
    category: "chinese",
    rating: 4.7,
    price: "high",
    distance: 2.1,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    address: "东城区前门大街",
    phone: "010-77889900",
    hours: "11:00-21:30",
    description: "百年老字号，正宗北京烤鸭，传统工艺",
    dishes: ["北京烤鸭", "鸭架汤", "京酱肉丝", "豌豆黄"],
    tags: ["中餐", "烤鸭", "老字号", "传统"]
  },
  {
    id: 8,
    name: "喜茶",
    category: "coffee",
    rating: 4.3,
    price: "medium",
    distance: 0.7,
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
    address: "朝阳区三里屯太古里",
    phone: "010-44556677",
    hours: "10:00-22:00",
    description: "新式茶饮品牌，创新口味，年轻时尚",
    dishes: ["芝士茶", "水果茶", "奶茶", "欧包"],
    tags: ["茶饮", "新式", "年轻", "创新"]
  }
];

// 应用状态
let currentCategory = 'all';
let currentFilters = {
  price: 'all',
  rating: 'all',
  distance: 'all'
};
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let currentRestaurant = null;

// DOM 元素
const searchInput = document.getElementById('searchInput');
const filterBtn = document.getElementById('filterBtn');
const filterModal = document.getElementById('filterModal');
const closeFilter = document.getElementById('closeFilter');
const restaurantList = document.getElementById('restaurantList');
const restaurantModal = document.getElementById('restaurantModal');
const backBtn = document.getElementById('backBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// 初始化应用
function initApp() {
  renderRestaurants();
  setupEventListeners();
}

// 设置事件监听器
function setupEventListeners() {
  // 搜索功能
  searchInput.addEventListener('input', handleSearch);
  
  // 分类切换
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => handleCategoryChange(tab.dataset.category));
  });
  
  // 筛选功能
  filterBtn.addEventListener('click', () => showModal('filterModal'));
  closeFilter.addEventListener('click', () => hideModal('filterModal'));
  
  // 筛选条件
  document.querySelectorAll('.price-btn').forEach(btn => {
    btn.addEventListener('click', () => handleFilterChange('price', btn.dataset.price));
  });
  
  document.querySelectorAll('.rating-btn').forEach(btn => {
    btn.addEventListener('click', () => handleFilterChange('rating', btn.dataset.rating));
  });
  
  document.querySelectorAll('.distance-btn').forEach(btn => {
    btn.addEventListener('click', () => handleFilterChange('distance', btn.dataset.distance));
  });
  
  // 应用筛选
  document.getElementById('applyFilter').addEventListener('click', applyFilters);
  document.getElementById('resetFilter').addEventListener('click', resetFilters);
  
  // 餐厅详情
  backBtn.addEventListener('click', () => hideModal('restaurantModal'));
  favoriteBtn.addEventListener('click', toggleFavorite);
  
  // 底部导航
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => handleNavChange(item.dataset.page));
  });
  
  // 点击遮罩关闭模态框
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal(modal.id);
    });
  });
}

// 渲染餐厅列表
function renderRestaurants(restaurants = RESTAURANT_DATA) {
  const filteredRestaurants = filterRestaurants(restaurants);
  
  restaurantList.innerHTML = filteredRestaurants.map(restaurant => `
    <div class="restaurant-card" data-id="${restaurant.id}">
      <div class="restaurant-image">
        <img src="${restaurant.image}" alt="${restaurant.name}" loading="lazy">
        <div class="restaurant-badge">${getCategoryName(restaurant.category)}</div>
        <button class="quick-favorite ${favorites.includes(restaurant.id) ? 'active' : ''}" 
                data-id="${restaurant.id}">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="restaurant-info">
        <div class="restaurant-header">
          <h3 class="restaurant-name">${restaurant.name}</h3>
          <div class="restaurant-rating">
            <i class="fas fa-star"></i>
            <span>${restaurant.rating}</span>
          </div>
        </div>
        <div class="restaurant-meta">
          <span class="price-range">${getPriceSymbol(restaurant.price)}</span>
          <span class="distance">${restaurant.distance}km</span>
          <span class="delivery-time">30-40分钟</span>
        </div>
        <p class="restaurant-description">${restaurant.description}</p>
        <div class="restaurant-tags">
          ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
  
  // 添加餐厅卡片点击事件
  document.querySelectorAll('.restaurant-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.quick-favorite')) {
        const restaurantId = parseInt(card.dataset.id);
        showRestaurantDetail(restaurantId);
      }
    });
  });
  
  // 添加快速收藏事件
  document.querySelectorAll('.quick-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const restaurantId = parseInt(btn.dataset.id);
      toggleFavoriteById(restaurantId);
    });
  });
}

// 筛选餐厅
function filterRestaurants(restaurants) {
  return restaurants.filter(restaurant => {
    // 分类筛选
    if (currentCategory !== 'all' && restaurant.category !== currentCategory) {
      return false;
    }
    
    // 价格筛选
    if (currentFilters.price !== 'all' && restaurant.price !== currentFilters.price) {
      return false;
    }
    
    // 评分筛选
    if (currentFilters.rating !== 'all' && restaurant.rating < parseFloat(currentFilters.rating)) {
      return false;
    }
    
    // 距离筛选
    if (currentFilters.distance !== 'all' && restaurant.distance > parseFloat(currentFilters.distance)) {
      return false;
    }
    
    return true;
  });
}

// 处理搜索
function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const filtered = RESTAURANT_DATA.filter(restaurant => 
    restaurant.name.toLowerCase().includes(query) ||
    restaurant.description.toLowerCase().includes(query) ||
    restaurant.tags.some(tag => tag.toLowerCase().includes(query))
  );
  renderRestaurants(filtered);
}

// 处理分类切换
function handleCategoryChange(category) {
  currentCategory = category;
  
  // 更新标签状态
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-category="${category}"]`).classList.add('active');
  
  renderRestaurants();
}

// 处理筛选条件变化
function handleFilterChange(type, value) {
  // 更新按钮状态
  document.querySelectorAll(`.${type}-btn`).forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-${type}="${value}"]`).classList.add('active');
  
  currentFilters[type] = value;
}

// 应用筛选
function applyFilters() {
  hideModal('filterModal');
  renderRestaurants();
}

// 重置筛选
function resetFilters() {
  currentFilters = {
    price: 'all',
    rating: 'all',
    distance: 'all'
  };
  
  // 重置按钮状态
  document.querySelectorAll('.price-btn, .rating-btn, .distance-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('[data-price="all"], [data-rating="all"], [data-distance="all"]').forEach(btn => {
    btn.classList.add('active');
  });
  
  renderRestaurants();
}

// 显示餐厅详情
function showRestaurantDetail(restaurantId) {
  const restaurant = RESTAURANT_DATA.find(r => r.id === restaurantId);
  if (!restaurant) return;
  
  currentRestaurant = restaurant;
  
  // 更新收藏按钮状态
  favoriteBtn.classList.toggle('active', favorites.includes(restaurantId));
  
  // 渲染详情内容
  document.getElementById('restaurantName').textContent = restaurant.name;
  document.getElementById('restaurantDetailContent').innerHTML = `
    <div class="detail-image">
      <img src="${restaurant.image}" alt="${restaurant.name}">
    </div>
    <div class="detail-info">
      <div class="detail-header">
        <div class="detail-rating">
          <i class="fas fa-star"></i>
          <span>${restaurant.rating}</span>
          <span class="rating-count">(128条评价)</span>
        </div>
        <div class="detail-price">${getPriceSymbol(restaurant.price)}</div>
      </div>
      <div class="detail-meta">
        <div class="meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${restaurant.address}</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-phone"></i>
          <span>${restaurant.phone}</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-clock"></i>
          <span>营业时间：${restaurant.hours}</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-route"></i>
          <span>距离：${restaurant.distance}km</span>
        </div>
      </div>
      <div class="detail-description">
        <h4>餐厅介绍</h4>
        <p>${restaurant.description}</p>
      </div>
      <div class="detail-dishes">
        <h4>推荐菜品</h4>
        <div class="dishes-list">
          ${restaurant.dishes.map(dish => `<span class="dish-item">${dish}</span>`).join('')}
        </div>
      </div>
      <div class="detail-tags">
        <h4>标签</h4>
        <div class="tags-list">
          ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn-secondary">
          <i class="fas fa-phone"></i>
          电话预订
        </button>
        <button class="btn-secondary">
          <i class="fas fa-map-marker-alt"></i>
          导航前往
        </button>
        <button class="btn-primary">
          <i class="fas fa-share"></i>
          分享
        </button>
      </div>
    </div>
  `;
  
  showModal('restaurantModal');
}

// 切换收藏状态
function toggleFavorite() {
  if (!currentRestaurant) return;
  
  const restaurantId = currentRestaurant.id;
  const index = favorites.indexOf(restaurantId);
  
  if (index > -1) {
    favorites.splice(index, 1);
    showToast('已取消收藏');
  } else {
    favorites.push(restaurantId);
    showToast('已添加到收藏');
  }
  
  // 保存到本地存储
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // 更新按钮状态
  favoriteBtn.classList.toggle('active', favorites.includes(restaurantId));
  
  // 重新渲染列表
  renderRestaurants();
}

// 通过ID切换收藏状态
function toggleFavoriteById(restaurantId) {
  const index = favorites.indexOf(restaurantId);
  
  if (index > -1) {
    favorites.splice(index, 1);
    showToast('已取消收藏');
  } else {
    favorites.push(restaurantId);
    showToast('已添加到收藏');
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderRestaurants();
}

// 处理导航切换
function handleNavChange(page) {
  // 更新导航状态
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  
  // 根据页面显示不同内容
  switch(page) {
    case 'home':
      renderRestaurants();
      break;
    case 'favorites':
      const favoriteRestaurants = RESTAURANT_DATA.filter(r => favorites.includes(r.id));
      renderRestaurants(favoriteRestaurants);
      break;
    case 'nearby':
      // 按距离排序
      const nearbyRestaurants = [...RESTAURANT_DATA].sort((a, b) => a.distance - b.distance);
      renderRestaurants(nearbyRestaurants);
      break;
    case 'profile':
      showToast('个人中心功能开发中...');
      break;
  }
}

// 显示模态框
function showModal(modalId) {
  document.getElementById(modalId).classList.add('show');
  document.body.style.overflow = 'hidden';
}

// 隐藏模态框
function hideModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
  document.body.style.overflow = 'auto';
}

// 显示提示消息
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// 工具函数
function getCategoryName(category) {
  const categoryMap = {
    'chinese': '中餐',
    'western': '西餐',
    'japanese': '日料',
    'korean': '韩料',
    'dessert': '甜品',
    'coffee': '咖啡'
  };
  return categoryMap[category] || '其他';
}

function getPriceSymbol(price) {
  const priceMap = {
    'low': '¥',
    'medium': '¥¥',
    'high': '¥¥¥'
  };
  return priceMap[price] || '¥';
}

// 初始化应用
document.addEventListener('DOMContentLoaded', initApp);