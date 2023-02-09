import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class DbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    // create vpc
    const vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2,
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
    });

    // create private subnets
    const privateSubnets = vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
    });

    // create public subnets
    const publicSubnets = vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC,
    });

    // TODO output vpc
  }
}
