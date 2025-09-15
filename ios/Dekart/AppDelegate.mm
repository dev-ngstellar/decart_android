#import "AppDelegate.h"


#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Dekart";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  //self.initialProps = @{};

  //return [super application:application didFinishLaunchingWithOptions:launchOptions];

  NSURL *jsCodeLocation;
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"Dekart"
                                                 initialProperties:nil
                                                     launchOptions:launchOptions];
    
    rootView.backgroundColor = [UIColor whiteColor];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;

}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
//#if DEBUG
//  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
//#else
//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//#endif
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
}

@end
