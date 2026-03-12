"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const contact_module_1 = require("./contact/contact.module");
const service_module_1 = require("./service/service.module");
const case_study_module_1 = require("./case-study/case-study.module");
const partner_module_1 = require("./partner/partner.module");
const faq_module_1 = require("./faq/faq.module");
const seed_module_1 = require("./seed/seed.module");
const industry_module_1 = require("./industry/industry.module");
const level_module_1 = require("./level/level.module");
const upload_module_1 = require("./upload/upload.module");
const setting_module_1 = require("./setting/setting.module");
const auth_module_1 = require("./auth/auth.module");
const ai_module_1 = require("./ai/ai.module");
const recruitment_module_1 = require("./recruitment/recruitment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    uri: config.get('MONGODB_URI'),
                }),
            }),
            contact_module_1.ContactModule,
            service_module_1.ServiceModule,
            case_study_module_1.CaseStudyModule,
            partner_module_1.PartnerModule,
            faq_module_1.FaqModule,
            seed_module_1.SeedModule,
            industry_module_1.IndustryModule,
            level_module_1.LevelModule,
            upload_module_1.UploadModule,
            setting_module_1.SettingModule,
            auth_module_1.AuthModule,
            ai_module_1.AiModule,
            recruitment_module_1.RecruitmentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map