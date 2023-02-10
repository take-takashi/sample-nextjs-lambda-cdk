import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class DbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    // create vpc
    const vpc = new ec2.Vpc(this, "Vpc", {
      natGateways: 0,
      maxAzs: 2,
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
    });

    // create private subnets
    const privateSubnets = vpc.selectSubnets({
      subnetGroupName: "private-subnet",
      subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
    });

    // create public subnets
    /*
    const publicSubnets = vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC,
    });
    */

    // create security group for BastionHost
    const ec2Sg = new ec2.SecurityGroup(this, "Ec2Sg", {
      vpc: vpc,
      securityGroupName: "BastionHostSg",
    });

    // create ec2 for BationHost
    const bastionHostEc2 = new ec2.BastionHostLinux(this, "BastionHostEc2", {
      vpc: vpc,
      instanceName: "BastionHostEc2ForRDS",
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      subnetSelection: privateSubnets,
      securityGroup: ec2Sg,
    });

    // TODO output vpc
  }
}
