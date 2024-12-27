<template>
  <div class="root-container">
    <header class="header">
      <h1>浮世絵ナビゲーター</h1>
      <p class="subtitle">画像整理と研究のための統合プラットフォーム</p>
    </header>

    <main class="main-content">
      <div class="user-type-section">
        <!-- 研究者向けセクション -->
        <div class="user-card researcher">
          <div class="card-content">
            <h2>研究者の方へ</h2>
            <p>浮世絵研究のための高度な機能を提供しています。詳細な分析ツール、データセット管理、分析結果の可視化などをご利用いただけます。</p>
            <ul class="feature-list">
              <li>画像データの分類、整理機能</li>
              <li>研究データのエクスポート機能</li>
            </ul>
            <div class="action-buttons">
              <router-link to="/researcher/dashboard" class="button secondary">研究者ダッシュボード</router-link>
            </div>
          </div>
        </div>

        <!-- 一般ユーザー向けセクション -->
        <div class="user-card general">
          <div class="card-content">
            <h2>一般の方へ</h2>
            <p>直感的な操作で画像を閲覧・検索できるギャラリーシステムを提供しています。3段階のタグシステムで効率的な画像検索が可能です。</p>
            <ul class="feature-list">
              <li>階層的なタグ検索システム</li>
              <li>視覚的なギャラリー表示</li>
              <li>画像詳細情報の閲覧</li>
            </ul>
            <div class="action-buttons">
              <router-link to="/gallery_intro" class="button primary">ギャラリーを閲覧</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="links">
          <router-link to="/about">このプラットフォームについて</router-link>
          <router-link to="/terms">利用規約</router-link>
          <router-link to="/privacy">プライバシーポリシー</router-link>
          <router-link to="/contact">お問い合わせ</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'RootLanding'
};
</script>

<style scoped>
.root-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7f9;
}

.header {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
}

.subtitle {
  font-size: 1.2rem;
  color: #546e7a;
  margin-top: 10px;
}

.main-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.user-type-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 20px;
}

.user-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.user-card:hover {
  transform: translateY(-5px);
}

.card-content {
  padding: 30px;
}

.card-content h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.card-content p {
  color: #546e7a;
  line-height: 1.6;
  margin-bottom: 20px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
}

.feature-list li {
  padding: 8px 0;
  color: #546e7a;
  position: relative;
  padding-left: 20px;
}

.feature-list li:before {
  content: "•";
  color: #4caf50;
  position: absolute;
  left: 0;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.button {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.button.primary {
  background-color: #4caf50;
  color: white;
}

.button.primary:hover {
  background-color: #45a049;
}

.button.secondary {
  background-color: #e0e0e0;
  color: #333;
}

.button.secondary:hover {
  background-color: #d5d5d5;
}

.footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.links a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
}

.links a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .user-type-section {
    grid-template-columns: 1fr;
  }
  
  .header {
    padding: 40px 20px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}
</style>