export interface Settings {
    /**
     * 总功能开关
     *
     * 是否启用此APP修改。
     *
     * @defaultValue true
     */
    Switch?: boolean;
    /**
     * 国家或地区代码
     *
     * 不同国家或地区提供的内容或有差别。
     *
     * @remarks
     *
     * Possible values:
     * - `'AUTO'` - 🇺🇳自动（跟随地区检测结果）
     * - `'CN'` - 🇨🇳中国大陆
     * - `'HK'` - 🇭🇰香港
     * - `'TW'` - 🇹🇼台湾
     * - `'SG'` - 🇸🇬新加坡
     * - `'US'` - 🇺🇸美国
     * - `'JP'` - 🇯🇵日本
     * - `'AU'` - 🇦🇺澳大利亚
     * - `'GB'` - 🇬🇧英国
     * - `'KR'` - 🇰🇷韩国
     * - `'CA'` - 🇨🇦加拿大
     * - `'IE'` - 🇮🇪爱尔兰
     *
     * @defaultValue "US"
     */
    CountryCode?: 'AUTO' | 'CN' | 'HK' | 'TW' | 'SG' | 'US' | 'JP' | 'AU' | 'GB' | 'KR' | 'CA' | 'IE';
    /**
     * [搜索]显示News+内容
     *
     * 是否显示News+搜索结果。
     *
     * @defaultValue true
     */
    NewsPlusUser?: boolean;
}
